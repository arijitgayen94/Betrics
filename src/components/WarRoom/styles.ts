import {Dimensions, Platform, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    gradientStyle: {
      width: Dimensions.get('window').width,
      height: 60,
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    gradientinnerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    teamLogo: {
      height: 40,
      width: 40,
      borderRadius: 50,
    },
    tableTeamLogo: {
      height: 30,
      width: 30,
      resizeMode: 'contain',
      marginRight: 5,
    },
    teamName: {
      color: theme.colors.primaryText,
      fontWeight: '600',
      fontSize: 18,
      fontFamily: theme.fonts.poppingsNormal,
      marginLeft: 10,
    },
    btnWrapper: {flexDirection: 'row', alignItems: 'center'},
    btnStyle: {width: 70},
    secondaryButtonStyle: {
      height: 35,
      backgroundColor: '#808080',
      borderRadius: 4,
      padding: 9,
      width: 95,
    },
    secondaryButtonTextStyle: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 14,
      padding: 0,
      lineHeight: 18,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    secondaryButtonStyleLight: {
      height: 35,
      backgroundColor: '#E3E3E3',
      borderRadius: 4,
      padding: 9,
      width: '100%',
    },
    secondaryButtonTextStyleLight: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 14,
      padding: 0,
      lineHeight: 18,
      fontFamily: theme.fonts.poppingsNormal,
      color: '#808080',
    },
    btnGradientStyle35: {
      borderRadius: 4,
      height: 35,
      justifyContent: 'center',
    },
    primaryButton: {
      padding: 0,
      width: 95,
      height: 35,
    },
    primaryButtonGradient: {
      height: 35,
      padding: 0,
      borderRadius: 4,
      justifyContent: 'center',
    },
    btnTextStyle: {
      textAlign: 'center',
      fontWeight: '500',
      width: '100%',
      fontSize: 14,
      padding: 0,
      lineHeight: 20,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    lineDropdownWr: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    lineViewLabelText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '400',
      fontSize: 13,
      color: theme.colors.drawerText,
      marginRight: 5,
    },
    lineViewSelect: {
      width: '85%',
      position: 'relative',
      right: -20,
    },
    lineViewSelect50: {
      width: '52%',
      position: 'relative',
    },
    separator: {
      borderBottomColor: theme.colors.primaryBorder,
      borderBottomWidth: 2,
      width: '90%',
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'center',
    },
    dropdownWrapperStyle: {
      flexDirection: 'row',
      padding: 15,
    },
    dropdownLabelWrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dropdownButtonStyle: {
      backgroundColor: theme.colors.primaryText,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.primaryBorder,
      width: '50%',
      height: 40,
    },
    dropdownOpened: {
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    dropdownButtonTextStyle: {
      textAlign: 'left',
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '400',
      fontSize: 12,
      color: theme.colors.secondaryText,
    },
    tableHeaderGradientStyle: {
      width: Dimensions.get('window').width,
      height: 50,
      // paddingHorizontal: 15,
      justifyContent: 'center',
    },
    tabViewText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
      fontSize: 14,
      fontWeight: '500',
      padding: 15,
    },
    tabViewTextActive: {
      fontFamily: theme.fonts.poppingsNormal,
      color: '#009BDB',
      fontSize: 14,
      fontWeight: '500',
      padding: 15,
    },
    grayTabWr: {
      width: Dimensions.get('window').width,
      height: 45,
      backgroundColor: '#E3E3E3',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingHorizontal: 15,
    },
    grayTabViewText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: '#0C0712',
      fontSize: 14,
      fontWeight: '400',
      padding: 12,
    },
    grayTabViewTextActive: {
      fontFamily: theme.fonts.poppingsNormal,
      color: '#009BDB',
      fontSize: 14,
      fontWeight: '400',
      padding: 12,
      borderBottomColor: '#009BDB',
      borderBottomWidth: 2,
    },
    swipeableTabsStyle: {
      display: 'flex',
    },
    WrMatchDetailsView: {
      padding: 20,
      width: '100%',
      paddingTop: 25,
    },
    WrMatchGrayView: {
      padding: 20,
      width: '100%',
      paddingTop: 25,
      backgroundColor: theme.colors.lightGrayBg,
    },
    WrMGVCards: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    WrMGVButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // paddingLeft: 20,
      width: '100%',
      marginBottom: 11,
    },
    WrMGVScore: {
      paddingLeft: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headingStyle1: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 20,
      lineHeight: 20,
      color: '#0C0712',
    },
    headingStyle2: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 20,
      color: '#0C0712',
    },
    subHeadingStyle1: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 20,
      color: '#808080',
      marginBottom: 15,
    },
    subHeadingStyle13: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 20,
      color: '#808080',
      marginBottom: 15,
    },
    subHeadingStyle15: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 15,
      lineHeight: 22,
      color: '#808080',
      paddingHorizontal: 15,
    },
    teamDetails: {
      flexDirection: 'row',
      marginBottom: 10,
      width: '100%',
      justifyContent: 'space-between',
    },
    betRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 35,
    },
    betOutlineInput: {
      height: 30,
      borderColor: '#E3e3e3',
      borderWidth: 2,
      borderRadius: 4,
      color: '#808080',
      shadowColor: '#E3e3e3',
      fontSize: 14,
      width: 75,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    centerValue: {
      width: '25%',
      alignItems: 'center',
      height: '100%',
      paddingHorizontal: 0,
    },
    teamsCards: {
      marginTop: 10,
      justifyContent: 'space-around',
    },
    teamCard: {
      marginTop: -25,
      paddingLeft: Platform.OS === 'android' ? 34 : 20,
      position: 'relative',
    },
    teamsCardsFull: {
      width: '100%',
      display: 'flex',
      paddingHorizontal: 15,
      paddingBottom: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    teamCardFull: {
      margin: 0,
      paddingLeft: 34,
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    teamHeadingStyle1: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      color: '#0C0712',
    },
    teamHeadingStyleCenter: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      color: '#0C0712',
    },
    teamHeadingStyle18: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 18,
      lineHeight: 27,
      color: '#0C0712',
    },
    teamHeadingStyle1Blue: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      color: '#00316B',
    },
    centerTextView: {
      flex: 0.4,
      paddingTop: 0,
      alignItems: 'center',
    },
    blackCardsWr: {
      width: '100%',
      marginTop: -5,
    },
    blackCardsRow: {
      flexDirection: 'row',
      width: '60%',
      marginLeft: -10,
    },
    blackCard: {
      backgroundColor: '#0C0712',
      color: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      margin: 5,
      padding: 5,
      flex: 1,
    },
    blackCardValue1: {
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 8,
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
      fontWeight: '400',
    },
    blackCardValue2: {
      color: '#009BDB',
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 13,
      fontWeight: '500',
    },
    blackCardValue2i: {
      textAlign: 'center',
      color: '#ffffff',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 13,
      fontWeight: '500',
    },
    teamAvatarIcon24: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.lightGrayBg,
      position: 'absolute',
      left: 0,
    },
    teamAvatarRowIcon24: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.lightGrayBg,
    },
    ml10: {
      marginLeft: 10,
    },
    ph15: {
      paddingHorizontal: 15,
    },
    modalGradientBtn: {
      paddingVertical: 14,
      borderRadius: 4,
      justifyContent: 'center',
    },
    w40: {
      width: '40%',
    },
    w45: {
      width: '45%',
    },
    WrGlCCard: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
      width: '100%',
      marginBottom: 15,
      marginTop: 15,
    },
    WrMGVTeamButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // marginBottom: 11,
      width: '100%',
    },
    secondaryOutlineButtonStyle: {
      height: 35,
      borderColor: '#808080',
      borderWidth: 2,
      borderRadius: 4,
      width: '47%',
      justifyContent: 'center',
      alignItems: 'center',
      // marginLeft: '3%',
    },
    secondaryOutlineTextStyle: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
      color: '#0C0712',
    },
    primaryOutlineButtonStyle: {
      height: 35,
      borderColor: '#009BDB',
      borderWidth: 2,
      borderRadius: 4,
      width: '47%',
      justifyContent: 'center',
      alignItems: 'center',
      // marginRight: '3%',
    },
    primaryOutlineTextStyle: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
      color: '#0C0712',
    },
    tableContainerOverSized: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
      width: '150%',
      marginBottom: 40,
    },
    tableContainer: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
      width: '100%',
      marginBottom: 40,
      marginTop: 10,
    },
    svTableContainer: {
      maxHeight: 500,
    },
    scrollableTable: {
      width: '100%',
    },
    tableBorderStyle: {
      borderWidth: 1,
      width: '100%',
      borderColor: theme.colors.primaryBorder,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      overflow: 'hidden',
    },
    tableHeaderRowStyle: {
      height: 40,
      backgroundColor: '#009BDB',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    customTableHeaderRowStyle: {
      height: 40,
      backgroundColor: '#009BDB',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      flexDirection: 'row',
      overflow: 'hidden',
    },
    customTableHeaderCellStyle: {
      height: 40,
      flex: 1,
    },
    customTableHeaderCellStyle2: {
      height: 40,
      flex: 2,
    },
    tableHeaderTextStyle: {
      marginLeft: 0,
      marginVertical: 6,
      paddingHorizontal: 10,
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 11,
      fontWeight: '500',
      color: theme.colors.primaryBg,
      alignItems: 'center',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    tableFooterRowStyle: {
      height: 40,
      backgroundColor: theme.colors.primaryBorder,
    },
    tableFooterTextStyle: {
      marginLeft: 6,
      marginVertical: 6,
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.drawerText,
    },
    tableBodyTextStyle: {
      margin: 6,
      marginLeft: 0,
      fontSize: 12,
      color: '#0C0712',
      height: 28,
      paddingVertical: 5,
      textAlign: 'center',
    },
    tableBodyTextStyleAutoHeight: {
      margin: 6,
      marginLeft: 10,
      fontSize: 11,
      color: '#0C0712',
      textAlign: 'center',
    },
    tableCustomRow: {
      flexDirection: 'row',
    },
    tableCustomCellStyle: {
      flex: 1,
    },
    tableCustomCellStyle2: {
      flex: 2,
    },
    h50: {height: 50},
    tableCustomCellTextStyle: {
      fontSize: 12,
      color: '#0C0712',
      padding: 10,
    },
    injuryStatusHeaderStyle: {
      fontSize: 13,
      color: '#fff',
      padding: 10,
    },
    injuryStatusHeadStyle: {
      fontSize: 13,
      color: '#0C0712',
    },
    injuryStatusTextStyle: {
      fontSize: 12,
      color: '#0C0712',
    },
    injuryStatusStyle: {
      fontSize: 12,
      color: '#0C0712',
    },
    injuryStatusBoxStyle: {
      padding: 10,
    },
    injuryStatusRowStyle: {
      fontSize: 13,
      fontWeight: '500',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
    },
    injuryStatusHeaderRowStyle: {
      fontSize: 13,
      fontWeight: '500',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
    },
    tableBodyTextStyleCentered: {
      margin: 6,
      marginLeft: 13,
      fontSize: 12,
      color: '#0C0712',
      height: 28,
      textAlign: 'center',
      paddingVertical: 5,
    },
    head: {height: 40, backgroundColor: '#f1f8ff'},
    thumbStyle: {
      backgroundColor: 'red',
      height: 13,
      width: 13,
      borderRadius: 50,
    },
    blueBg: {
      backgroundColor: theme.colors.lightBlueBg,
    },
    trackStyle: {borderColor: '#009BDB', borderWidth: 2, width: 43},
    ratingHeading: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 18,
      textAlign: 'center',
      lineHeight: 20,
      color: '#0C0712',
      paddingTop: 5,
      marginBottom: 20,
    },
    inlineTextImage: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    inlineTextImageText: {
      fontWeight: '600',
      color: '#000',
    },
    inlineTextImageImage: {
      marginStart: 5,
      height: 30,
      width: '40%',
      resizeMode: 'contain',
    },
    inlineArrows: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 20,
      paddingBottom: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    pt20: {
      paddingTop: 20,
    },
    mb20: {
      marginBottom: 20,
    },
    mb0: {
      marginBottom: 0,
    },
    centerMr0: {textAlign: 'center', marginLeft: 0},
    pb20: {
      paddingBottom: 20,
    },
    inlineArrowsText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#000',
      textTransform: 'capitalize',
    },
    rankingButtonPosition: {
      position: 'relative',
      bottom: Platform.OS === 'android' ? -0 : 0,
      width: '100%',
      backgroundColor: '#fff',
    },
    flexRow: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 10,
    },
    flexCol: {
      paddingHorizontal: 7,
      flex: 1,
    },
    flexCol8: {
      paddingHorizontal: 7,
      flex: 8,
    },
    cellflexRow: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      fontSize: 12,
      lineHeight: 18,
      paddingBottom: 6,
      paddingHorizontal: 10,
      color: '#0C0712',
    },
    handicapCountInputCon: {
      width: 110,
      marginLeft: 'auto',
      position: 'relative',
      right: 0,
    },
    handicapCountInput: {
      padding: 0,
    },
    selectedBetBg: {
      backgroundColor: '#009BDB',
      flex: 1,
    },
    selectedBlackCard: {
      backgroundColor: '#009BDB',
      color: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      margin: 5,
      padding: 5,
      flex: 1,
    },
    spreadCard: {
      backgroundColor: theme.colors.drawerText,
      borderRadius: 5,
    },
    dragableTable: {
      width: '100%',
      height: '86%',
      // paddingHorizontal: 15,
      marginBottom: 10,
    },
    dragableRow: {
      flexDirection: 'row',
    },
    dragableCell: {
      // flex: 1,
      padding: 10,
      fontSize: 12,
      color: '#0C0712',
      minHeight: 40,
      textAlign: 'center',
      paddingVertical: 5,
      borderColor: '#efefef',
      borderWidth: 1,
      marginTop: -1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dragableCellActive: {
      // flex: 1,
      padding: 10,
      fontSize: 12,
      color: '#0C0712',
      minHeight: 40,
      textAlign: 'center',
      paddingVertical: 5,
      borderColor: '#efefef',
      borderWidth: 1,
      marginTop: -1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#efefef',
    },
    firstCell: {
      // flex: 1,
      width: '17%',
      padding: 10,
      fontSize: 12,
      color: '#0C0712',
      minHeight: 40,
      textAlign: 'center',
      paddingVertical: 5,
      borderColor: '#efefef',
      borderWidth: 1,
      marginTop: -1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    otherCell: {
      // flex: 1,
      width: '27.5%',
      padding: 10,
      fontSize: 12,
      color: '#0C0712',
      minHeight: 40,
      textAlign: 'center',
      paddingVertical: 5,
      borderColor: '#efefef',
      borderWidth: 1,
      marginTop: -1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    firstCellActive: {
      // flex: 1,
      width: '17%',
      padding: 10,
      fontSize: 12,
      color: '#0C0712',
      minHeight: 40,
      textAlign: 'center',
      paddingVertical: 5,
      borderColor: '#efefef',
      borderWidth: 1,
      marginTop: -1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#efefef',
    },
    otherCellActive: {
      // flex: 1,
      width: '27.5%',
      padding: 10,
      fontSize: 12,
      color: '#0C0712',
      minHeight: 40,
      textAlign: 'center',
      paddingVertical: 5,
      borderColor: '#efefef',
      borderWidth: 1,
      marginTop: -1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#efefef',
    },
    mt50: {
      marginTop: 50,
    },
    graphView: {
      width: '90%',
      borderRadius: 8,
      overflow: 'hidden',
    },
    graphOptionView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 5,
      paddingHorizontal: 20,
      marginBottom: 30,
    },
    deactiveButton: {
      width: 45,
      height: 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.lightGrayBg,
      borderRadius: 4,
    },
    activeButton: {
      width: 45,
      height: 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.lightBlueText,
      borderRadius: 4,
    },
    activeButtonText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.primaryBg,
    },
    deactiveButtonText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.drawerText,
    },
    text: {
      margin: 6,
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
    },
    row: {flexDirection: 'row'},
    btn: {width: 58, height: 18},
    btnView: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    btnText: {
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
      fontWeight: '400',
    },
    imageView: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    elementThree: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 35,
    },
    imageIcon: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
    },
    evProgressBar: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: 40,
      width: '100%',
    },
    textStyle: {
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
      color: theme.colors.blackText,
    },
    cellStyle: {
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
      color: theme.colors.blackText,
    },
    elementOneBar: {
      width: '100%',
      backgroundColor: theme.colors.grayBg,
    },
    coloredBGBar: {
      width: '100%',
      height: 10,
      alignItems: 'flex-end',
      overflow: 'hidden',
      backgroundColor: theme.colors.grayBg,
    },
    barView: {
      height: 10,
      backgroundColor: theme.colors.lightBlueText,
    },
    elementTwoBar: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    sortIcon: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
      tintColor: '#FFF',
    },
    statsDiffView: {
      flexDirection: 'row',
      width: '35%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    offButton: {
      padding: 0,
      width: 55,
      height: 35,
    },
    offButtonGradient: {
      height: 35,
      padding: 0,
      borderRadius: 25,
      justifyContent: 'center',
    },
    diffButtonStyle: {
      height: 35,
      backgroundColor: '#808080',
      borderRadius: 25,
      padding: 9,
      width: 55,
    },
    modalChildren: {
      paddingBottom: 20,
      alignItems: 'center',
    },
    betOptionView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
    },
    betNameCard: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
      fontSize: 14,
      fontWeight: '500',
    },
    betGreenText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.onlineGreen,
      fontSize: 14,
      fontWeight: '500',
    },
    betRedText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.googleRed,
      fontSize: 14,
      fontWeight: '500',
    },
    popupText: {
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 15,
      fontWeight: '400',
    },
    okayButton: {
      width: 110,
      height: 55,
      borderRadius: 8,
      justifyContent: 'center',
      marginTop: 20,
    },
    modalView: {
      width: '100%',
      padding: 20,
      alignItems: 'center',
    },
    btnGradientStyle55: {
      borderRadius: 4,
      height: 55,
      justifyContent: 'center',
    },
    okayTextStyle: {
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 15,
      fontWeight: '500',
      color: theme.colors.primaryText,
    },
    matchupBetCountContainer: {
      backgroundColor: theme.colors.primaryBg,
      borderColor: theme.colors.primaryBorder,
      borderWidth: 1,
      paddingHorizontal: 10,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
    },
    borderRadius: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 5,
    },
    blankView: {
      height: 40,
      backgroundColor: '#009BDB',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.primaryBorder,
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftColumnBorders: {
      borderRightWidth: 1,
      borderRightColor: theme.colors.primaryBorder,
    },
    scrollView: {
      flex: 1,
      backgroundColor: 'white',
    },
    statsRow: {
      height: 55,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.primaryBorder,
    },
    customTextStyle: {
      margin: 0,
      marginLeft: 0,
      paddingVertical: 0,
    },
    flexRowOnly: {
      flex: 1,
      flexDirection: 'row',
    },
    image: {
      height: 25,
      width: 40,
      marginTop: 5,
    },
    subscriptionView: {
      width: '100%',
      height: (Dimensions.get('window').height * 3) / 4,
    },
    btnGradientStyle: {
      borderRadius: 4,
      height: 25,
      justifyContent: 'center',
    },
    width60: {width: '60%'},
    extraView: {width: '100%', height: 20},
    marginLeft12: {
      marginLeft: -12,
    },
    justifyEverly: {justifyContent: 'space-evenly'},
    flex1: {flex: 1, flexDirection: 'row'},
    width100: {
      width: 100,
    },
    blankCellView: {
      height: 40,
      backgroundColor: '#009BDB',
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flexWhite: {
      flex: 1,
      backgroundColor: 'white',
    },
    tableRowStyle: {
      height: 55,
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderBottomColor: theme.colors.primaryBorder,
      borderRightColor: theme.colors.primaryBorder,
    },
    font12: {
      fontSize: 12,
      fontFamily: theme.fonts.poppingsNormal,
    },
  });
};

export default styles;
