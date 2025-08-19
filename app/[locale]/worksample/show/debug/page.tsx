export default function DebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
        ✅ Debug Page - Basic Route Working!
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
          <h2 className="font-semibold mb-2">Success!</h2>
          <p>If you can see this page, the basic routing structure is working.</p>
        </div>

        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <h2 className="font-semibold mb-2">Next Steps:</h2>
          <p>Now try visiting a dynamic route like:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code>/ar/worksample/show/flyer</code></li>
            <li><code>/ar/worksample/show/cnc</code></li>
            <li><code>/ar/worksample/show/character</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
} 