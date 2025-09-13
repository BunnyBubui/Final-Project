import { StyleSheet } from 'react-native';

const loginStyle = StyleSheet.create({
  root: { 
    flex: 1,
    backgroundColor: '#EEF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: { 
    width: '92%',
    maxWidth: 560,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111',
    marginBottom: 12,
  },
  group: { 
    marginBottom: 12,
  },
  label: {  
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111',
  },
  input: {   
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  btn: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  btnText: {  
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  error: {  
    marginTop: 4,
    marginBottom: 8,
    color: '#DC2626',
    fontSize: 13,
    textAlign: 'center',
  },
  row: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  rowBtn: {   
    backgroundColor: '#111',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginLeft: 8,
  },
  rowText: { 
    color: '#fff',
    fontWeight: '700',
  },
});

export { loginStyle };
