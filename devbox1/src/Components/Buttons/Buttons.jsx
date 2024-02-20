import './Buttons.css'
import request from '../../assets/form.png'
import manage from '../../assets/manage.png'
import dashboard from '../../assets/dashboard.png'

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Buttons = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
const checkButtonStyle = Styles.includes(buttonStyle) 
? buttonStyle 
: STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

  return (
    <Link to='/sign-up' className='btn-moble'>
        <button
        className={'btn ${checkButtonStyle} ${checkButtonSize}'}
        onClick={onClick}
        type={type}
        >
            {children}
        </button>
    </Link>
  )
};
