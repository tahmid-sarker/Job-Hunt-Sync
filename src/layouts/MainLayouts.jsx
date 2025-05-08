import Header from '../components/common/Header';
import { Outlet } from 'react-router';
import Footer from '../components/common/Footer';

const MainLayouts = () => {
    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayouts;