import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useRestaurantContext } from '../../contexts/RestaurantContext';

const SideMenu = () => {
  const navigate = useNavigate();
  const { restaurant } = useRestaurantContext();

  const onClick = async (menuItem) => {
    if (menuItem.key === "signOut") {
      await Auth.signOut();
      return window.location.reload();
    }
    navigate(menuItem.key);
  };

  const mainMenuItem = [
    {
      key: '/',
      label: 'Orders'
    },
    {
      key: 'menu',
      label: 'Menu'
    },
    {
      key: 'order-history',
      label: 'Order History'
    },
  ];

  const menuItems = [
    ...(restaurant ? mainMenuItem : []),
    {
      key: 'settings',
      label: 'Settings'
    },
    {
      key: 'signOut',
      label: 'Sign Out',
      danger: true
    }
  ];

  return (
    <>
      {restaurant && <h3>{restaurant.name}</h3>}
      <Menu items={menuItems} onClick={onClick} />
    </>
  )
}

export default SideMenu