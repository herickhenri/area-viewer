interface TitleProps {
  children: React.ReactNode
}

export function Title({ children }: TitleProps) {
  return (
    <h1 className="mx-6 my-5 text-center text-2xl font-semibold md:text-4xl">
      {children}
    </h1>
  )
}
