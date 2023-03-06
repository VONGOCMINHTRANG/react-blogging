import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import HomeBanner from "module/home/HomeBanner";
import Layout from "components/layout/Layout";
import HomeFeature from "module/home/HomeFeature";
import HomeNewest from "module/home/HomeNewest";

const HomePage = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth);
        navigate("/sign-in");

    }
    return (
        <>
            {/* <button onClick={handleSignOut}>sign out</button> */}
            <Layout>
                <HomeBanner></HomeBanner>
                <HomeFeature></HomeFeature>
                <HomeNewest></HomeNewest>
            </Layout>

        </>

    )
}

export default HomePage;