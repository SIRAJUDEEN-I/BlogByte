const loading = () => {
  return (
    <div className="min-h-screen bg-[#18181B] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        {/* Simple spinning white circle */}
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        
        {/* Simple white text */}
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  )
}
export default loading