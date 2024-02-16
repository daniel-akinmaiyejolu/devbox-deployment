import './Navbar.css'
import white_logo from '../../assets/white-logo.png'
import nav_background from '../../assets/navbar.png'
import user_icon from '../../assets/user.png'
import notification_icon from '../../assets/notification.png'

const Navbar = () => {
    return (
        <div className='nav'>
            <img src={user_icon} className='user-icon' alt="" />
            <span className='email'>user@email.com</span>
            <img src={notification_icon} className='notification-icon' alt="" />
            <img src={nav_background} className='nav-background' alt="" />
            <img src={white_logo} className='nav-logo' alt="" />
        </div>
    )
}
export default Navbar