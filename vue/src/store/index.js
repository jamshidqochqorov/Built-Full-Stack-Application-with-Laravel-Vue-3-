import {createStore} from "vuex";
import axiosClient from "../axios.js"
const tmpSurveys = [
    {
        "id": 2,
        "image_url": "http://127.0.0.1:8000/images/v1KkLzEBwNpGwWPN.jpeg",
        "title": "Yangi yil uchun qizarli show",
        "slug": "yangi-yil-uchun-qizarli-show",
        "status": true,
        "description": "hammasi jud azo'r boldi!",
        "created_at": "2023-12-30 10:37:21",
        "updated_at": "2023-12-30 10:37:21",
        "expire_date": "2024-01-26",
        "questions": [
            {
                "id": 3,
                "type": "radio",
                "question": "Direktor kimga sovg'a berdi?",
                "description": "?",
                "data": {
                    "options": [
                        {
                            "uuid": "d015a3cc-57d4-491b-a9f1-360349fba2ef",
                            "text": "Jamshidga"
                        },
                        {
                            "uuid": "51f69962-7f46-446d-aebf-fbf05f75a3ba",
                            "text": "Anvarga"
                        },
                        {
                            "uuid": "c061bb9b-8c7b-4fd1-8cb2-1db947e44fc3",
                            "text": "Hojmatga"
                        },
                        {
                            "uuid": "a62ac4fe-1d2c-42f3-be16-3bcba61bbe93",
                            "text": "teshavoyga"
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": 1,
        "image_url": "http://127.0.0.1:8000/images/iOjFN2WlVqd1h3NL.jpeg",
        "title": "jamshid samarqanga borgani haqida",
        "slug": "jamshid-samarqanga-borgani-haqida",
        "status": true,
        "description": "Mening ismim jamshid yoshim 19 da",
        "created_at": "2023-12-30 10:30:20",
        "updated_at": "2023-12-30 10:30:20",
        "expire_date": "2024-02-17",
        "questions": [
            {
                "id": 1,
                "type": "checkbox",
                "question": "Qayu ranglaridi yahshi ko'raman?",
                "description": null,
                "data": {
                    "options": [
                        {
                            "uuid": "5256fac0-39a8-4a1d-946e-2dd3dae1c198",
                            "text": "oq"
                        },
                        {
                            "uuid": "1a05f5e6-891b-4757-81db-b1f9a36834b6",
                            "text": "qiziq"
                        },
                        {
                            "uuid": "98e5a400-c1bb-458c-af08-fb303c33e191",
                            "text": "yashil"
                        },
                        {
                            "uuid": "60a2ad0d-d6f1-400d-a06a-25bdfef72737",
                            "text": "qora"
                        }
                    ]
                }
            },
            {
                "id": 2,
                "type": "select",
                "question": "Qaysu viloyatdanman?",
                "description": "juda zo'r savol :)",
                "data": {
                    "options": [
                        {
                            "uuid": "941e67ea-553d-4b9c-8561-3892993edfbd",
                            "text": "Farg'ona"
                        },
                        {
                            "uuid": "ef0e0abd-cb85-488c-b269-556e24d00d95",
                            "text": "Qoqon"
                        },
                        {
                            "uuid": "15174dbd-64e6-4956-ad7f-95e4657ae684",
                            "text": "Toshkent"
                        },
                        {
                            "uuid": "f0e17ce9-b199-44ee-9750-f065a99ecf0d",
                            "text": "Samarqand"
                        }
                    ]
                }
            }
        ]
    }
];
const store = createStore({
    state:{
        user:{
            data:{
            },
            token:sessionStorage.getItem('TOKEN')
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
        surveys:[...tmpSurveys]
    },
    getters:{},
    actions:{
        register({commit},user){
            return axiosClient.post('/register',user)
                .then(({data})=>{
                    commit('setUser',data);
                    return data;
                })
        },
        login({commit},user){
            return axiosClient.post('/login',user)
                    .then(({data})=>{
                        commit('setUser',data);
                        return data;
                    })
        },
        logout({commit}){
            return axiosClient.post('/logout')
                .then(response=>{
                    commit('logout');
                     return response;
                })
        }
    },
    mutations:{
        logout:state=>{
                state.user.data={}
                state.user.token =null
                sessionStorage.removeItem('TOKEN')
        },
        setUser:(state,userData)=>{
           state.user.token = userData.token
           state.user.data = userData.user
            sessionStorage.setItem('TOKEN',userData.token)
        }
    },
    modules:{}
});

export default store
