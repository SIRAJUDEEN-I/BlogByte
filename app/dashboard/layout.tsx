import LeftSidebar from "@/components/dashboard/left-sidebar"




const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="min-h-screen">
        <div className="flex">
            
        <LeftSidebar/>
<div className="flex-1">

        {children}
</div>
        </div>
    </div>
  )
}
export default layout