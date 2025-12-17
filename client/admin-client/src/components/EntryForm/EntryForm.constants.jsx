import countryList from "country-list"
export const TEA_TYPES = [
    "white", "green", "black", "yellow", "oolong", 
    "fermented", "tisane/non-camellia sinensis"
]
export const HARVEST_METHODS = [
    "handpicked", "tea scissors", "handheld-machine", 
    "driven harvestor", "others (please specify in notes)"
]
export const COUNTRIES = countryList.getNames()
export const PRODUCTION_STEPS = [
    "withering", "kill green", "bruising", "oxidation", 
    "rolling", "shaping", "drying", "yellowing", "fermenting"
]