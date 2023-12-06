

export const readableOrderStatus = (status) => {
    switch(status){
        case 0:
            return "Need Admin Confirmation"
        case 1:
            return "Need Customer Payment"
        case 2:
            return "Need Admin Payment Confirmation"
        case 3:
            return "On Process"
        case 4:
            return "Package Sent"
        case 9: 
            return "Order cancelled"
        default:
            return "Unknown status"
    }
}