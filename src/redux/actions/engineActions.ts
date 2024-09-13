import {
  SET_ENGINES,
  SET_ACTIVE_ENGINE,
  LOADER,
  RESET_ENGINE_STORE,
} from '../actionTypes';
import {
  deleteEngineApi,
  getEngineListApi,
  postCreateEngineApi,
  putUpdateEngineConfigurationApi,
  updateEngineApi,
} from '../apis';
import {AppDispatch} from '../store';
import toast from 'react-native-simple-toast';
import {
  CreateEngine,
  Engine,
  UpdateEngine,
  UpdateEngineConfiguration,
} from '../modals';

const getAllEnginesAction = (
  successCallback?: (data: Array<Engine>) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getEngineListApi(
      (res: any) => {
        const {data} = res;
        dispatch({type: SET_ENGINES, payload: data});
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data[0]?.message);
        dispatch({type: LOADER, payload: false});
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const createEngineAction = (
  engine: CreateEngine,
  successCallback?: (data: Engine) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    postCreateEngineApi(
      engine,
      (res: any) => {
        const {data} = res;
        toast.show('Engine created successfully.');
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data[0]?.message);
        dispatch({type: LOADER, payload: false});
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
  };
};

const deleteEngineAction = (
  engineUuid: string,
  successCallback?: () => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    deleteEngineApi(
      engineUuid,
      () => {
        toast.show('Deleted successfully');
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback();
        }
      },
      (error: any) => {
        dispatch({type: LOADER, payload: false});
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
  };
};

const updateEngineAction = (
  engine: UpdateEngine,
  successCallback?: (data: Engine) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    updateEngineApi(
      engine,
      (res: any) => {
        const {data} = res;
        toast.show('Updated successfully');
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data[0]?.message);
        dispatch({type: LOADER, payload: false});
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
  };
};
const updateEngineConfigurationAction = (
  engineUuid: any,
  body: Array<UpdateEngineConfiguration>,
  successCallback?: (data: Engine) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    putUpdateEngineConfigurationApi(
      engineUuid,
      body,
      (res: any) => {
        const {data} = res;
        toast.show('Updated successfully');
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data[0]?.message);
        dispatch({type: LOADER, payload: false});
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
  };
};

const setActiveEngineAction = (engine: Engine) => {
  return (dispatch: AppDispatch) => [
    dispatch({type: SET_ACTIVE_ENGINE, payload: engine}),
  ];
};

const resetEngineAction = () => {
  return (dispatch: AppDispatch) => {
    dispatch({type: RESET_ENGINE_STORE});
  };
};

export {
  getAllEnginesAction,
  createEngineAction,
  deleteEngineAction,
  updateEngineAction,
  setActiveEngineAction,
  updateEngineConfigurationAction,
  resetEngineAction,
};
