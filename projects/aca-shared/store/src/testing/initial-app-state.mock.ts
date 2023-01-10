import { AppState, AppStore } from '../states/app.state';

export const INITIAL_APP_STATE: AppState = {
  appName: 'Alfresco Content Application',
  headerColor: '#ffffff',
  headerTextColor: '#000000',
  logoPath: 'assets/images/alfresco-logo-white.svg',
  headerImagePath: 'assets/images/mastHead-bg-shapesPattern.svg',
  customCssPath: '',
  webFontPath: '',
  sharedUrl: '',
  user: {
    isAdmin: null,
    id: null,
    firstName: '',
    lastName: ''
  },
  selection: {
    nodes: [],
    libraries: [],
    isEmpty: true,
    count: 0
  },
  navigation: {
    currentFolder: null
  },
  currentNodeVersion: null,
  infoDrawerOpened: false,
  infoDrawerPreview: false,
  infoDrawerMetadataAspect: '',
  showFacetFilter: true,
  fileUploadingDialog: true,
  documentDisplayMode: 'list',
  showLoader: false,
  repository: {
    status: {
      isQuickShareEnabled: true
    }
  } as any
};

export const INITIAL_APP_STORE: AppStore = {
  app: INITIAL_APP_STATE
};
