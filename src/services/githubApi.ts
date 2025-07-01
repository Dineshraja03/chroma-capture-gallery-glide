
// GitHub API service for uploading images
// Uses environment variables for secure token storage

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || ""; 
const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER || localStorage.getItem('github_owner') || "";
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || localStorage.getItem('github_repo') || "";
const IMAGES_FOLDER = "uploaded-images";

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
}

export interface GitHubUploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export const isGitHubConfigured = (): boolean => {
  const token = GITHUB_TOKEN || localStorage.getItem('github_token');
  const owner = GITHUB_OWNER || localStorage.getItem('github_owner');
  const repo = GITHUB_REPO || localStorage.getItem('github_repo');
  
  return !!(token && owner && repo);
};

export const getGitHubConfig = (): GitHubConfig | null => {
  const token = GITHUB_TOKEN || localStorage.getItem('github_token');
  const owner = GITHUB_OWNER || localStorage.getItem('github_owner');
  const repo = GITHUB_REPO || localStorage.getItem('github_repo');
  
  if (!token || !owner || !repo) {
    return null;
  }
  
  return { token, owner, repo };
};

export const setGitHubConfig = (config: GitHubConfig): void => {
  localStorage.setItem('github_token', config.token);
  localStorage.setItem('github_owner', config.owner);
  localStorage.setItem('github_repo', config.repo);
};

export const uploadImageToGitHub = async (
  file: File,
  filename: string
): Promise<GitHubUploadResponse> => {
  try {
    const config = getGitHubConfig();
    
    if (!config) {
      throw new Error('GitHub configuration not found. Please configure your GitHub settings first.');
    }

    // Convert file to base64
    const base64Content = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix to get just the base64 content
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Create the file path
    const filePath = `${IMAGES_FOLDER}/${Date.now()}-${filename}`;

    // GitHub API endpoint
    const apiUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`;

    console.log('Uploading to GitHub:', { filePath, apiUrl, owner: config.owner, repo: config.repo });

    // Upload to GitHub
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Upload image: ${filename}`,
        content: base64Content,
        branch: 'main', // or your default branch
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('GitHub API error:', response.status, errorData);
      throw new Error(`GitHub API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('Upload successful:', data);
    
    return {
      success: true,
      url: data.content.download_url,
    };
  } catch (error) {
    console.error('Error uploading to GitHub:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const deleteImageFromGitHub = async (filePath: string): Promise<boolean> => {
  try {
    const config = getGitHubConfig();
    
    if (!config) {
      console.error('GitHub configuration not found');
      return false;
    }

    // First, get the file info to get the SHA
    const getResponse = await fetch(
      `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`,
      {
        headers: {
          'Authorization': `token ${config.token}`,
        },
      }
    );

    if (!getResponse.ok) {
      console.error('Failed to get file info for deletion');
      return false;
    }

    const fileData = await getResponse.json();

    // Delete the file
    const deleteResponse = await fetch(
      `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${config.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Delete image: ${filePath}`,
          sha: fileData.sha,
          branch: 'main',
        }),
      }
    );

    return deleteResponse.ok;
  } catch (error) {
    console.error('Error deleting from GitHub:', error);
    return false;
  }
};
