const key = "UserBlogListApp"

export const setStorage = (user)=>{
window.localStorage.setItem(key, JSON.stringify(user))
}

export const loadStorage = ()=>{
window.localStorage.getItem(key)

}