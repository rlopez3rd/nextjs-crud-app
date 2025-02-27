import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface AppBar {
  toggleDrawer: () => void
}

const AppBar = ({toggleDrawer} : {toggleDrawer: () => void}) => {
  return (
    <div className="">
       <header className="flex items-center justify-between px-4 h-18 border-slate-50 bg-white drop-shadow-sm">
        <div className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ mr: 2}}
             >
               <MenuIcon />
             </IconButton>
          <h1 className="text-xl font-bold">TechHive</h1>
        </div>
      </header>
    </div>
  )
}

export default AppBar;