import { ElementType } from "react"
import { Link } from "react-router-dom"

interface ButtonAdmProps {
  content: string,
  icon: ElementType
  link: string
}

export function ButtonAdm({ content, icon: Icon, link }: ButtonAdmProps) {
  return (
    <Link 
      to={link} 
      className="w-full p-2 text-blue-600 font-medium text-xl flex items-center justify-center gap-2 rounded border border-solid border-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
    > 
      <Icon size={32}/>
      {content}
  </Link>
  )
}