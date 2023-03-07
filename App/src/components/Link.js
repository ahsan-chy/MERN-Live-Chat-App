import React from 'react'
import { Link } from 'react-router-dom'

const LinkButton = ({ label, icon, to, type, onClick, sx, style,className }) => {
  return (
    <>
      <Link type={type} 
            to={to} 
            onClick={onClick} 
            sx={sx} 
            style={style}
            className={className}
      >
      {icon} {label}
      </Link>
    </>
  )
}

export default LinkButton
