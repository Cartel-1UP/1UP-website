
export default function actions() {
  return (
    <div>actions</div>
  )
}

// var dhive = require('@hivechain/dhive');
// var client = new dhive.Client('https://anyx.io');

// const fetchLogin = () => async (dispatch: (arg0: { type: string; payload: string; }) => void) => {

//     let logged_user = "";
//     if (cookies.get("username") !== undefined && cookies.get("token") !== undefined && cookies.get("type") !== undefined)
//     {
//         const response = (await backend.post('/auth/user',
//             {username: cookies.get("username"), token: cookies.get("token"), type : cookies.get("type")})).data;

//         if (response.status === "ok") {

//             let hive_data = await client.database.getAccounts([cookies.get("username")]);

//             hive_data = hive_data[0];

//             logged_user = {
//                 username: cookies.get("username"),
//                 token: cookies.get("token"),
//                 hive_data : hive_data,
//                 voting_power : Math.ceil(utils.getvotingpower(hive_data)*100)/100,
//                 downvoting_power : Math.ceil(utils.downvotingpower(hive_data)*100)/100,
//                 vp_threshold : response.vp_threshold,
//                 dv_threshold : response.dv_threshold,
//                 min_payout : response.min_payout,
//                 revote : response.revote,
//                 type: cookies.get("type"),

//             };
//         }
//     }

//     dispatch({
//         type: 'FETCH_LOGIN',
//         payload: logged_user
//     });
// };


// const login = (data: { name: any; username: any; token: any; vp_threshold: any; dv_threshold: any; min_payout: any; revote: any; }) => async(dispatch: (arg0: { type: string; payload: { username: any; token: any; avatar: string; hive_data: any; voting_power: number; downvoting_power: number; vp_threshold: any; dv_threshold: any; min_payout: any; revote: any; type: string; }; }) => void) => {

//     const cookies = new Cookies();

//     let next_week = new Date();

//     next_week.setDate(next_week.getDate() + 14);

//     let name = data.name;
//     let profile_image = "https://steemitimages.com/u/"+name+"/avatar";

//     cookies.set('username', data.username, { path: '/', expires : next_week});
//     cookies.set('token', data.token, { path: '/', expires : next_week});
//     cookies.set('type', "hivesigner", { path: '/', expires : next_week});

//     let hive_data = await client.database.getAccounts([data.username]);

//     hive_data = hive_data[0];

//     let logged_user = {
//         username : data.username,
//         token : data.token,
//         avatar: profile_image,
//         hive_data : hive_data,
//         voting_power : Math.ceil(utils.getvotingpower(hive_data)*100)/100,
//         downvoting_power : Math.ceil(utils.downvotingpower(hive_data)*100)/100,
//         vp_threshold : data.vp_threshold,
//         dv_threshold : data.dv_threshold,
//         min_payout : data.min_payout,
//         revote : data.revote,
//         type: "hivesigner"
//     };

//     dispatch({
//         type: 'LOGIN',
//         payload: logged_user
//     });
// };


// const logout = (username, token, type) => async (dispatch) => {
//     const cookies = new Cookies();

//     cookies.remove("login");
//     cookies.remove("username");
//     cookies.remove("token");

//     await backend.post('/auth/logout', {username: username, token: token, type : type});

//     dispatch({
//         type: 'LOGOUT',
//         payload: ""
//     });
// };

// const login_keychain = (username, encrypted_username) => async (dispatch) => {

//     let data = (await backend.post('/auth/keychain/login', {username, encrypted_username})).data;

//     if (data.status === "ok")
//     {
//         data = data.account;

//         const cookies = new Cookies();

//         let next_week = new Date();

//         next_week.setDate(next_week.getDate() + 14);

//         let profile_image = "https://steemitimages.com/u/"+username+"/avatar";

//         cookies.set('username', data.username, { path: '/', expires : next_week});
//         cookies.set('token', data.token, { path: '/', expires : next_week});
//         cookies.set('type', "keychain", { path: '/', expires : next_week});

//         let hive_data = await client.database.getAccounts([username]);

//         hive_data = hive_data[0];

//         let logged_user = {
//             username : username,
//             token : data.token,
//             avatar: profile_image,
//             hive_data : hive_data,
//             voting_power : Math.ceil(utils.getvotingpower(hive_data)*100)/100,
//             downvoting_power : Math.ceil(utils.downvotingpower(hive_data)*100)/100,
//             vp_threshold : data.vp_threshold,
//             dv_threshold : data.dv_threshold,
//             min_payout : data.min_payout,
//             type : "keychain",
//             revote : data.revote,
//         };

//         dispatch({
//             type: 'LOGIN',
//             payload: logged_user
//         });
//     }



// };



// export {
//     fetchLogin,
//     login,
//     logout,
//     login_keychain,
// };