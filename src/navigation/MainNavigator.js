import { createDrawerNavigator , createStackNavigator} from 'react-navigation';
// import { createStackNavigator } from '@react-navigation/stack';
import { 
    IntroScreen, 
    EmptyNotificationPage,
    DriverTripCompleteSreen, 
    ProfileScreen, 
    TaskListIgnorePopup,
    RideListPage, 
    NotificationPage, 
    MapScreen, 
    BookedCabScreen,
    RegistrationPage,
    LoginScreen,
    FareScreen,
    DriverStartTrip,
    DriverCompleteTrip,
    RideDetails,
    DriverTripAccept,
    DriverRegistrationPage,
    SearchScreen,
    BookingQuoteScreen,
    CustomerVerification
} from '../screens';
import SideMenu from '../components/SideMenu';
import EnterScreen from '../screens/EnterScreen';

//app stack for user end
    export const AppStack = {
        DriverFare: {
            screen: DriverTripCompleteSreen,
            navigationOptions:{
                header: null
            }
        },
        TaskListIgnorePopUp: {
            screen: TaskListIgnorePopup            
        },
        RideList:{
            screen: RideListPage,
            navigationOptions:{
            header:null,
            }
            
        },
        Notifications:{
            screen:NotificationPage,
            navigationOptions:{
                header:null,
                }
        },
        EmptyNotification:{
            screen:EmptyNotificationPage,
            navigationOptions:{
                header:null,
            }
        },
       
        Profile: {
            screen: ProfileScreen,
            navigationOptions:{
                header: null
            }
        },
        Map: {
            screen: MapScreen,
            navigationOptions:{
                header: null
            }
        },
        BookedCab: {
            screen: BookedCabScreen,
            navigationOptions:{
                header: null
            }
        },
        DriverTripAccept: {
            screen: DriverTripAccept,
            navigationOptions:{
                header: null
            }
        },
                  
        FareDetails: {
            screen: FareScreen,
            navigationOptions:{
                header:null,
            }
        },
        RideDetails: {
            screen: RideDetails,
            navigationOptions: {
                header: null
            }
        },
        DriverTripStart: {
            screen:  DriverStartTrip,
            navigationOptions:{
                header: null
            }
        },
        DriverTripComplete: {
            screen:  DriverCompleteTrip,
            navigationOptions:{
                header: null
            }
        },
        Search: {
            screen:  SearchScreen,
            navigationOptions:{
                header: null
            } 
        },
        BookingQuoteScreen:{
            screen: BookingQuoteScreen,
            navigationOptions:{header:null}
        }
    }

    //authentication stack for user before login
    export const AuthStack = createStackNavigator({
        Enter: {
            screen: EnterScreen,
            navigationOptions:{
            header:null
            }
        },
        Intro: {
            screen: IntroScreen,
            navigationOptions:{
            header:null
            }
        },
        Reg: {
            screen: RegistrationPage,
            navigationOptions:{
            header:null,
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions:{
                header:null,
            }
        },
        DriverReg: {
            screen:  DriverRegistrationPage,
            navigationOptions:{
                header:null,
            }
        },
        CustomerVerify:{
            screen: CustomerVerification,
            navigationOptions:{
                header:null,
            }
        }     
    },{
        initialRouteName: 'Enter',
    });

    //drawer routes, you can add routes here for drawer or sidemenu
    const DrawerRoutes = {
        'Map': {
            name: 'Map',
            screen: createStackNavigator(AppStack, {
                initialRouteName: 'Map', 
                navigationOptions:{
                    header: null
                } 
            })
        },
        'My Rides': {
            name: 'My Rides',
            screen: createStackNavigator(AppStack, { initialRouteName: 'RideList',headerMode: 'none' })
        },
        'Profile Setting': {
            name: 'Profile',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Profile', headerMode: 'none' })
        },
        'Notification': {
            name: 'Notification',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Notifications', headerMode: 'none' })
        },
        'DriverTripAccept': {
            name: 'DriverTripAccept',
            screen: createStackNavigator(AppStack, { initialRouteName: 'DriverTripAccept',headerMode: 'none' })
        }
    };

    //main navigator for user end
    export const RootNavigator =
        createStackNavigator({
            Drawer: {
                name: 'Drawer',
                screen: createDrawerNavigator(
                    DrawerRoutes,
                    {
                    headerMode: 'none',
                    contentComponent: SideMenu,
                    drawerWidth: 180,
                    contentOptions: {
                        itemsContainerStyle: {
                        marginVertical: 0,
                        },
                        iconContainerStyle: {
                            opacity: 1
                        }
                    },
                    useNativeAnimations : false,
                    // initialRouteName : 'My Rides'
                    }
                ),
            },
            ...AppStack
        },
        {
            headerMode: 'none',
            // initialRouteName : 'Home '
        }
  );

//main navigator for driver end
  export const DriverRootNavigator =
        createStackNavigator({
            Drawer: {
                name: 'Drawer',
                screen: createDrawerNavigator(
                    DrawerRoutes,
                    {
                    headerMode: 'none',
                    contentComponent: SideMenu,
                    drawerWidth: 180,
                    contentOptions: {
                        itemsContainerStyle: {
                        marginVertical: 0,
                        },
                        iconContainerStyle: {
                            opacity: 1
                        }
                    },
                    useNativeAnimations : false,
                    initialRouteName : 'DriverTripAccept'
                    }
                ),
            },
            ...AppStack
        },
        {
            headerMode: 'none',
            // initialRouteName : 'DriverTripAccept'
        }
  );

