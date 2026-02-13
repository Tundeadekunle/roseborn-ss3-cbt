
















// import { NextRequest, NextResponse } from 'next/server';
// import { google } from 'googleapis';
// import { JWT } from 'google-auth-library';

// // Initialize Google Auth with the new method
// const getAuth = () => {
//   try {
//     if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
//       throw new Error('Missing Google Sheets configuration');
//     }

//     // Clean and format the private key
//     const privateKey = process.env.GOOGLE_PRIVATE_KEY
//       .replace(/\\n/g, '\n')
//       .replace(/"/g, '')
//       .trim();

//     // Use the new JWT constructor directly from google-auth-library
//     return new JWT({
//       email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//       key: privateKey,
//       scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//     });
//   } catch (error) {
//     console.error('Auth initialization error:', error);
//     throw new Error('Failed to initialize Google Auth');
//   }
// };

// export async function POST(request: NextRequest) {
//   try {
//     // Validate environment variables
//     const envVars = {
//       hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//       hasKey: !!process.env.GOOGLE_PRIVATE_KEY,
//       hasSheetId: !!process.env.GOOGLE_SHEET_ID,
//     };

//     console.log('Environment variables check:', envVars);

//     if (!envVars.hasEmail || !envVars.hasKey || !envVars.hasSheetId) {
//       return NextResponse.json(
//         { 
//           success: false,
//           error: 'Google Sheets configuration is missing',
//           details: 'Please check your environment variables in Vercel settings'
//         },
//         { status: 500 }
//       );
//     }

//     const result = await request.json();
    
//     // Validate result data
//     if (!result.studentId || !result.studentName) {
//       return NextResponse.json(
//         { 
//           success: false,
//           error: 'Missing required student data' 
//         },
//         { status: 400 }
//       );
//     }

//     const auth = getAuth();
//     const sheets = google.sheets({ version: 'v4', auth });

//     // Prepare data for Google Sheets
//     const rowData = [
//       result.studentId,
//       result.studentName,
//       result.multipleChoiceScore?.toString() || '0',
//       Array.isArray(result.theoryAnswers) ? result.theoryAnswers.join(' | ') : '',
//       result.totalScore?.toString() || '0',
//       new Date(result.submittedAt || new Date()).toISOString(),
//       result.timeSpent || 'Not recorded'
//     ];

//     console.log('Saving to sheet:', {
//       spreadsheetId: process.env.GOOGLE_SHEET_ID,
//       rowData
//     });

//     const response = await sheets.spreadsheets.values.append({
//       spreadsheetId: process.env.GOOGLE_SHEET_ID,
//       range: 'A:G',
//       valueInputOption: 'USER_ENTERED',
//       requestBody: {
//         values: [rowData],
//       },
//     });

//     console.log('Successfully saved to Google Sheets');

//     return NextResponse.json({ 
//       success: true, 
//       message: 'Results saved successfully',
//       updatedRange: response.data.updates?.updatedRange 
//     });

//   } catch (error: any) {
//     console.error('Error saving to Google Sheet:', error);
    
//     let userMessage = 'Failed to save results to server';
//     let details = error.message;

//     if (error.code === 403) {
//       userMessage = 'Permission denied. Please check sheet sharing settings.';
//       details = 'The service account does not have permission to access the Google Sheet.';
//     } else if (error.code === 404) {
//       userMessage = 'Google Sheet not found.';
//       details = 'Please check the Sheet ID in environment variables.';
//     } else if (error.message.includes('invalid_grant')) {
//       userMessage = 'Authentication failed.';
//       details = 'Please check service account credentials.';
//     }

//     return NextResponse.json(
//       { 
//         success: false,
//         error: userMessage,
//         details: details,
//         code: error.code
//       },
//       { status: 500 }
//     );
//   }
// }
























import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { markSubjectAsCompleted } from '@/lib/progress';

// Initialize Google Auth
const getAuth = () => {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing Google Sheets configuration');
    }

    const privateKey = process.env.GOOGLE_PRIVATE_KEY
      .replace(/\\n/g, '\n')
      .replace(/"/g, '')
      .trim();

    return new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  } catch (error) {
    console.error('Auth initialization error:', error);
    throw new Error('Failed to initialize Google Auth');
  }
};

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Google Sheets configuration is missing',
          details: 'Please check your environment variables in Vercel settings'
        },
        { status: 500 }
      );
    }

    const result = await request.json();
    
    // Validate result data
    if (!result.studentId || !result.studentName || !result.subject) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required student data' 
        },
        { status: 400 }
      );
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare data for Google Sheets
    const rowData = [
      result.studentId,
      result.studentName,
      result.subject,
      result.multipleChoiceScore?.toString() || '0',
      Array.isArray(result.theoryAnswers) ? result.theoryAnswers.join(' | ') : '',
      result.totalScore?.toString() || '0',
      new Date(result.submittedAt || new Date()).toISOString(),
      result.timeSpent || 'Not recorded',
      result.studentClass || 'Not specified'
    ];

    console.log('Saving to Google Sheets:', {
      studentId: result.studentId,
      subject: result.subject,
      score: result.totalScore
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A:I', // Updated range for additional columns
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Successfully saved to Google Sheets');

    // Mark subject as completed in local progress tracking
    markSubjectAsCompleted(result);

    return NextResponse.json({ 
      success: true, 
      message: 'Results saved successfully',
      updatedRange: response.data.updates?.updatedRange 
    });

  } catch (error: any) {
    console.error('Error saving to Google Sheet:', error);
    
    // Even if Google Sheets fails, mark as completed locally
    try {
      const result = await request.json();
      markSubjectAsCompleted(result);
    } catch (e) {
      console.error('Failed to mark subject as completed locally:', e);
    }

    let userMessage = 'Failed to save results to server';
    let details = error.message;

    if (error.code === 403) {
      userMessage = 'Permission denied. Please check sheet sharing settings.';
      details = 'The service account does not have permission to access the Google Sheet.';
    } else if (error.code === 404) {
      userMessage = 'Google Sheet not found.';
      details = 'Please check the Sheet ID in environment variables.';
    } else if (error.message.includes('invalid_grant')) {
      userMessage = 'Authentication failed.';
      details = 'Please check service account credentials.';
    }

    return NextResponse.json(
      { 
        success: false,
        error: userMessage,
        details: details,
        code: error.code
      },
      { status: 500 }
    );
  }
}