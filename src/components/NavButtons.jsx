import { useNavigate, useLocation } from 'react-router-dom'

const pages = [
  { path: '/',           label: 'Home' },
  { path: '/grid-view',  label: 'Grid View' },
  { path: '/list-view',  label: 'List View' },
  { path: '/details/1',  label: 'Details' },
  { path: '/cart',       label: 'Cart' },
]

function NavButtons() {
  const navigate = useNavigate()
  const location = useLocation()

  const currentIndex = pages.findIndex(p => p.path === location.pathname)
  const prevPage = pages[currentIndex - 1]
  const nextPage = pages[currentIndex + 1]

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 20px',
      zIndex: 1000,
    }}>
      {/* Previous Button */}
      {prevPage ? (
        <button
          onClick={() => navigate(prevPage.path)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          ← {prevPage.label}
        </button>
      ) : <div />}

      {/* Next Button */}
      {nextPage ? (
        <button
          onClick={() => navigate(nextPage.path)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {nextPage.label} →
        </button>
      ) : <div />}
    </div>
  )
}

export default NavButtons