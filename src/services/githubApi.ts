
// GitHub API service for uploading images
// Uses environment variables for secure token storage

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || ""; // Will be populated from repository secrets
const GITHUB_OWNER = "your-username"; // Replace with your GitHub username
const GITHUB_REPO = "your-repo-name"; // Replace with your repository name
const IMAGES_FOLDER = "uploaded-images";

export interface GitHubUploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export const uploadImageToGitHub = async (
  file: File,
  filename: string
): Promise<GitHubUploadResponse> => {
  try {
    if (!GITHUB_TOKEN) {
      throw new Error('GitHub token not configured. Please set VITE_GITHUB_TOKEN environment variable.');
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
    const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;

    console.log('Uploading to GitHub:', { filePath, apiUrl });

    // Upload to GitHub
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
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
    if (!GITHUB_TOKEN) {
      console.error('GitHub token not configured');
      return false;
    }

    // First, get the file info to get the SHA
    const getResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
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
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
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
