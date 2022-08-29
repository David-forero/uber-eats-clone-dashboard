import { BrowserRouter } from 'react-router-dom';
import { Layout, Image } from 'antd';
import AppRoutes from './components/AppRoutes';
import SideMenu from '../src/components/SideMenu';


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
           <AppRoutes/>
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
