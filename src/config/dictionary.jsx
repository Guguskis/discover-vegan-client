import LocalizedStrings from 'react-localization';
import {useState} from "react";

const useDictionary = () => {
    const [DICTIONARY] = useState(new LocalizedStrings({
            en: {
                map: "Map",
                products: "Products",
                scan: "Scan",
                trends: "Trends",
                wishList: "WishList",
                login: "Login",
                signUp: "Sign up",
                addVendor: "Add vendor",
                pageNotFound: "Page Not Found 404",
                product: "Product",
                productName: "Product name",
                viewAll: "View all",
                submit: "Submit",
                name: "Name",
                producer: "Producer",
                price: "Price",
                uploadImage: "Upload image",
                uploadedImage: "Uploaded image",
                productImage: "Product image",
                searchVeganGoods: "Search vegan goods",
                newProduct: "New product",
                done: "Done",
                pleaseTryAgainLater: "Please try again later",
                vendorMightBeDeleted: "Vendor might be deleted",
                checkYourInput: "Check your input",
                somethingBadHappenedPleaseTryAgainLater: "Something bad happened, please try again later",
                listIsEmpty: "List is empty",
                email: "Email",
                password: "Password",
                repeatPassword: "Repeat password",
                dontHaveAccount: "Don't have account?",
                passwordMustBeAtLeastNCharacters: "Password must be at least 8 characters",
                passwordsMustMatch: "Passwords must match",
                invalidEmail: "Invalid email",
                emailIsAlreadyInUse: "Email is already in use",
                incorrectPassword: "Incorrect password",
                userDoesNotExist: "User does not exist",
            },
            lt: {
                map: "Žemėlapis",
                products: "Produktai",
                scan: "Skenuoti",
                trends: "Tendencijos",
                wishList: "Norų sąrašas",
                login: "Prisijungti",
                signUp: "Sukurti paskyrą",
                addVendor: "Pridėti prekyviatę",
                pageNotFound: "Puslapis nerastas 404",
                product: "Produktas",
                productName: "Produkto pavadinimas",
                viewAll: "Peržiūrėti visus",
                submit: "Skelbti",
                name: "Pavadinimas",
                producer: "Gamintojas",
                price: "Kaina",
                uploadImage: "Įkelti nuotrauką",
                uploadedImage: "Įkelta nuotrauką",
                productImage: "Produkto nuotrauka",
                searchVeganGoods: "Ieškoti veganiškų prekių",
                newProduct: "Naujas produktas",
                done: "Atlikta",
                pleaseTryAgainLater: "Prašome pamėginti vėliau",
                vendorMightBeDeleted: "Prekyviatė gali būti ištrinta",
                checkYourInput: "Patikrinkite įvesties formą",
                somethingBadHappenedPleaseTryAgainLater: "Nutiko kažkas blogo, prašome pamėginti vėliau",
                listIsEmpty: "Sąrašas tusčias",
                email: "El. paštas",
                password: "Slaptažodis",
                repeatPassword: "Pakartokite slaptažodį",
                dontHaveAccount: "Neturi paskyros?",
                passwordMustBeAtLeastNCharacters: "Slaptažodis turi būti bent 8 simbolių",
                passwordsMustMatch: "Slaptažodžiai turi sutapti",
                invalidEmail: "Netaisyklingas el. paštas",
                emailIsAlreadyInUse: "El. paštas užimtas",
                incorrectPassword: "Neteisingas slaptažodis",
                userDoesNotExist: "Toks naudotojas neegzistuoja",
            }
        })
    )

    const setLanguage = (language) => {
        DICTIONARY.setLanguage(language)
    }

    return {DICTIONARY, setLanguage};
}


export {useDictionary};
