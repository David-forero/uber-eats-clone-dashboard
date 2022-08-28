import DetailedOrder from './modules/DetailedOrder';
import Orders from './modules/Orders';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, Image } from 'antd';
import SideMenu from '../src/components/SideMenu';
import RestaurantMenu from './modules/RestaurantMenu';
import CreateMenuItem from './modules/CreateMenuItem';

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Sider style={{ height: "100vh", backgroundColor: 'white' }}>
          <Image
            src="https://logos-world.net/wp-content/uploads/2020/11/Uber-Eats-Symbol.jpg"
            preview={false}
          />

          <SideMenu />
        </Sider>
        <Layout>
          <Content>
            <Routes>
              <Route path='' element={<Orders />} />
              <Route path='menu' element={<RestaurantMenu />} />
              <Route path='order/:id' element={<DetailedOrder />} />
              <Route path='menu/create' element={<CreateMenuItem />} />
            </Routes>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Uber Eats Restaurant Dashboard Clone
          </Footer>
        </Layout>
      </Layout>

    </BrowserRouter>
  );
}

export default App;
