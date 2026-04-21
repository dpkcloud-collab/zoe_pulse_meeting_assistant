import { useState } from 'react';

function App() {
  const [transcript, setTranscript] = useState('');
  const [momData, setMomData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateMoM = async () => {
    // Basic validation
    if (!transcript.trim()) {
      setError('Please paste a transcript first.');
      return;
    }

    setLoading(true);
    setError('');
    setMomData(null);

    try {
      // Calling your FastAPI AI Engine!
      const response = await fetch('http://127.0.0.1:8000/api/v1/ai/generate-mom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meeting_id: 'test_meeting_001',
          text: transcript,
        }),
      });

      if (!response.ok) {
        throw new Error('Backend responded with an error.');
      }

      const result = await response.json();
      setMomData(result.data); // Store the generated JSON from Groq/Qwen
      
    } catch (err) {
      setError('Could not connect to the backend. Make sure your FastAPI server is running on port 8000!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Zoé Pulse
          </h1>
          <p className="text-indigo-100 mt-1">
            Real-time Meeting Intelligence Dashboard
          </p>
        </div>

        {/* Main Body */}
        <div className="p-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Paste Meeting Transcript
            </label>
            <textarea
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-slate-700"
              rows="6"
              placeholder="Speaker 1: Hi everyone, let's look at the Q3 metrics...&#10;Speaker 2: Agreed, we have some blockers to discuss."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md">
              <p>{error}</p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={generateMoM}
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-indigo-700 transition-all disabled:bg-indigo-300 shadow-md flex justify-center items-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Transcript...
              </span>
            ) : (
              'Generate Minutes of Meeting'
            )}
          </button>

          {/* AI Result Section */}
          {momData && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
                AI Insights Generated
              </h3>
              <div className="bg-slate-800 rounded-xl p-6 shadow-inner">
                <pre className="whitespace-pre-wrap text-sm text-emerald-400 font-mono">
                  {JSON.stringify(momData, null, 2)}
                </pre>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;