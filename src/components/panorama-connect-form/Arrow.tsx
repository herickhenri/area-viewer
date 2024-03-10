interface arrowProps {
  className?: string
}

export function Arrow({ className }: arrowProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
    >
      <path
        d="
      M50,50 m45,0
      a45,45 0 1,0 -90,0
      a45,45 0 1,0  90,0

      M50,50 m38,0
      a38,38 0 0,1 -76,0
      a38,38 0 0,1  76,0

      M50,50 m30,0
      a30,30 0 1,0 -60,0
      a30,30 0 1,0  60,0
      
      M50,40 m2.5,-2.5
      l17.5,17.5
      a 2.5,2.5 0 0 1 -5,5
      l-15,-15
      l-15,15
      a 2.5,2.5 0 0 1 -5,-5
      l17.5,-17.5
      a 3.5,3.5 0 0 1 5,0
  "
      />
    </svg>
  )
}
