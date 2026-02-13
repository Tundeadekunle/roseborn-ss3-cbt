import { ExamResult } from '@/types';

export const saveToGoogleSheet = async (result: ExamResult): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('/api/save-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save results');
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};