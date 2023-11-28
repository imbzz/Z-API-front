import {
  ModalForm, ProColumns,
  ProFormText,
  ProFormTextArea, ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import { Modal } from 'antd';
export type Props = {
  columns: ProColumns<API.InterfaceInfoVO>[],
  onCancel: () => void,
  onSubmit: (values: API.InterfaceInfoVO) => Promise<void>,
  visible: boolean,

}
const CreateModal: React.FC<Props> = (props) => {
  const {visible, onCancel, onSubmit,columns } = props;
  return (
    <Modal visible={visible} footer={null} onCancel={()=>onCancel?.()}>
      {
        <ProTable
          type="form"
          columns={columns}
          onSubmit={async(value)=>{
            onSubmit?.(value);
          }}
        />
      }
    </Modal>
  );
};
export default CreateModal;
