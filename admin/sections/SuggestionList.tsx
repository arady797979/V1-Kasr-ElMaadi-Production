
import React from 'react';
import { useApp } from '../../App';

const SuggestionList: React.FC = () => {
  const { data, setData } = useApp();

  const deleteSuggestion = (id: string) => {
    setData({ ...data, suggestions: data.suggestions.filter((s: any) => s.id !== id) });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">User Suggestions Box</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.suggestions.map((s: any) => (
          <div key={s.id} className="p-6 bg-slate-50 border border-slate-200 rounded-xl relative group">
            <button 
              onClick={() => deleteSuggestion(s.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                {s.name[0].toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{s.name}</h4>
                <p className="text-xs text-slate-400">{new Date(s.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm italic leading-relaxed">"{s.message}"</p>
          </div>
        ))}
        {data.suggestions.length === 0 && (
          <div className="col-span-full p-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
            No suggestions submitted yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestionList;
