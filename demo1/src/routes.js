import Home from "./components/Home";
import PersonalInformation from "./components/PersonalInformation";
import MyAccount from "./components/MyAccount";
import MyResources from "./components/MyResources";
import Login from "./components/Login";
import SystemPage from "./components/SystemPage";
import MyStar from "./components/MyStar";
import ShopCar from "./components/ShopCar";
import Buyed from "./components/Buyed";
import Expert_Home from "./components/Expert_Home";
import Rsource_Detail from "./components/Rsource_Detail";
import ArticleDetail from "./components/ArticleDetail/ArticleDetail";

export const routes=[

    {
        path:"/",
        component:Login,
        exact:true
    },
    {
        path:"/system",
        component:SystemPage
    }


]



export const routes2=[
    {
        path:"/system/",
        component:Home,
        exact: true
    },
    {
        path:"/system/personalinformation",
        component:PersonalInformation
    },
    {
        path:"/system/account",
        component:MyAccount
    },
    /*{
        path:"/system/resources",
        component:MyResources
    },*/
    {
        path:"/system/star",
        component:MyStar
    },
    {
    path:"/system/shopcar",
        component:ShopCar
    },{
        path:"/system/buyed",
        component:Buyed
    },
    {
        path:"/system/experthome",
        component:Expert_Home
    },
    {
        path:"/system/resource",
        component:Rsource_Detail
    },
    {
        path:"/system/article",
        component:ArticleDetail
    }
]

export const routes3=[

    {
        path:"/system/personalinformation/star",
        component:MyStar
    },
    {
        path:"/system/personalinformation/profile",
        component:MyAccount
    },
    {
        path:"/system/personalinformation/buyed",
        component:Buyed
    }
]
