import React from 'react'

const ResultCard = ({error,result}) => {
  return (
    <div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {result && (
          <div className="space-y-4 pt-4">
            
            <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-1">
                Summary
              </h3>
              <p className="text-gray-600">{result.summary}</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-1">
                Key Points
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {result.keyPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-1">
                Sentiment
              </h3>
              <p className="text-gray-600 capitalize">
                {result.sentiment}
              </p>
            </div>

          </div>
        )}
    </div>
  )
}

export default ResultCard