import Cookies from 'js-cookie'

export function authenticated(){
    if(Cookies.get('jwt')) return Cookies.get('jwt')
    else return false
}