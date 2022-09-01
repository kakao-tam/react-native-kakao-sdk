import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import type { ICallApi } from './ApiSample';
import ApiSample from './ApiSample';
import { ApiError } from 'react-native-kakao-sdk-common';

interface ILogContext {
  clear: () => void;
  log: (log: string | object, type?: string) => void;
  logs: string;
}

const LogContext = createContext<ILogContext>({
  clear: () => {
  },
  log: () => {
  },
  logs: '',
});

const RenderSectionHader = (info: { section: SectionListData<ICallApi> }) => {
  return (
    <Text style={styles.sectionHeader}>{info.section.key}</Text>
  );
};

interface RenderItemProps {
  info: SectionListRenderItemInfo<ICallApi>;
}

function timestamp(): string {
  let today = new Date();
  today.setHours(today.getHours() + 9);
  return today.toISOString().replace('T', ' ').substring(11, 23);
}

const RenderItem = (props: RenderItemProps) => {
  const { clear, log } = useContext<ILogContext>(LogContext);
  const [toggle, setToggle] = useState<boolean>(false);
  const execute = async (item: ICallApi) => {
    try {
      clear();
      log(`CALL - ${item.name}`);
      const result: any = await item.exec(log);
      log(result, 'RES');
    } catch (e) {
      let err = e as ApiError;
      log(`ERR -> ${JSON.stringify({
        code: err.code,
        message: err.message,
      }, null, 2)}`);
    }
  };
  const moreCaseToggle = () => {
    setToggle(!toggle);
  };
  return (
    <View style={styles.buttonBox}>
      <TouchableOpacity onPress={() => execute(props.info.item)} style={styles.buttonPrimary}>
        <Text style={styles.buttonPrimaryText}>{props.info.item.name}</Text>
      </TouchableOpacity>
      {props.info.item.case ? (
        <TouchableHighlight onPress={moreCaseToggle}
                            style={{ ...styles.buttonWarning, ...{ position: 'absolute', right: 10 } }}>
          <Text style={styles.buttonWarningText}>{toggle ? '▲' : '☰'}</Text>
        </TouchableHighlight>
      ) : null}
      {
        toggle ? props.info.item.case?.map(v => (
          <TouchableOpacity key={v.name} onPress={() => execute(v)}
                            style={{ ...styles.buttonSuccess, ...{ marginLeft: 20 } }}>
            <Text style={styles.buttonSuccessText}>{v.name}</Text>
          </TouchableOpacity>
        )) : null
      }
    </View>
  );
};

interface LogButtonProps {
  title: string;
  size: number;
  selectSize: number;
  onPress: () => void;
}

const LogButton = (props: LogButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={{ color: props.selectSize == props.size ? '#DC3545' : '#FFFFFF' }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

function allKeys(obj: any): string[] {
  const keys: string[] = [];
  if (!!obj) {
    Object.keys(obj).forEach(key => {
      keys.push(key);
      if (typeof obj[key] === 'object') {
        keys.push(...allKeys(obj[key]));
      }
    });
  }
  return keys;
}

export default function App() {
  const [logSize, setLogSize] = useState<number>(0.35);
  const [logs, setLogs] = useState<string>('');
  let logTemp = '';
  const log = (data: string | object, type?: string) => {
    let logData = data;
    if (typeof data == 'object') {
      if (type == 'RES') {
        logData = JSON.stringify(data, allKeys(data).sort(), 2);
      } else {
        logData = JSON.stringify(data);
      }
    }
    logTemp += `${logTemp ? '\n' : ''}[${timestamp()}] ${type ? type + ' -> ' : ''}${logData}`;
    setLogs(logTemp);
  };
  const clear = () => {
    logTemp = '';
    setLogs('');
  };
  return (
    <LogContext.Provider value={{
      logs, log, clear,
    }}>
      <SafeAreaView style={styles.container}>
        <SectionList
          style={{ flex: 1 }}
          sections={ApiSample}
          keyExtractor={(item) => item.name}
          renderSectionHeader={RenderSectionHader}
          renderItem={(info) => <RenderItem info={info} />}
        />
        <View style={{ backgroundColor: '#F1EEE9', flex: logSize }}>
          <View style={styles.logTitleBox}>
            <Text style={styles.logTitle}>LOG</Text>
            <LogButton title='35%' selectSize={logSize} size={0.35} onPress={() => setLogSize(0.35)} />
            <LogButton title='50%' selectSize={logSize} size={1} onPress={() => setLogSize(1)} />
            <LogButton title='85%' selectSize={logSize} size={3.5} onPress={() => setLogSize(3.5)} />
          </View>
          <ScrollView>
            <Text selectable={true} style={styles.logText}>{logs}</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LogContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  itemBox: {
    paddingLeft: 10,
  },
  logTitleBox: {
    backgroundColor: '#73777B',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  logText: {},
  logButton: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 8,
  },
  buttonBox: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 1,
    marginBottom: 1,
  },
  buttonPrimary: {
    backgroundColor: '#0D6EFD',
    color: '#FFFFFF',
    padding: 8,
  },
  buttonSuccess: {
    backgroundColor: '#28A745',
    color: '#FFFFFF',
    padding: 8,
  },
  buttonDanger: {
    backgroundColor: '#DC3545',
    color: '#FFFFFF',
    padding: 8,
  },
  buttonWarning: {
    backgroundColor: '#ffc107',
    color: '#FFFFFF',
    padding: 8,
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
  },
  buttonSuccessText: {
    color: '#FFFFFF',
  },
  buttonDangerText: {
    color: '#FFFFFF',
  },
  buttonWarningText: {
    color: '#212529',
  },
});
