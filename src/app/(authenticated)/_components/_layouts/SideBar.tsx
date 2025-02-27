
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/navigation'

const routes = [
  {
    name: 'User Maintenance',
    path: 'user-maintenance',
  },
  {
    name: 'Position Maintenance',
    path: 'position-maintenance',
  }
]

const SideBar = ({open} : {open: boolean}) => {

  const router = useRouter()

  const redirect = (path: string) => {        
    router.push(path)     
}

  return (
    <div className={`border-1 bg-white h-screen py-3 px-2 shadow-md duration-300 ease-in-out w-[260px] ${ open ? 'md:ml-[0]' : 'ml-[-260px]'}`}>
      {/* <h2>Sidebar</h2> */}
      <List>
          {routes.map((item, index) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => redirect(item.path)}>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
    </div>
  )
}

export default SideBar;