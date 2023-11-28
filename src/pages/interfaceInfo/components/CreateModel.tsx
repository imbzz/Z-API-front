import {
  ModalForm, ProColumns,
  ProFormText,
  ProFormTextArea, ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import { Modal } from 'antd';
export type Props = {
  columns: ProColumns<API.InterfaceInfoVO>[]
  //当前用户点击取消触发
  onCancel: () => void;
  //当前用户提交表单触发，将用户输入的数据穿给后台
  onSumbit: (values:API.InterfaceInfoVO) => Promise<void>;
  //模态框是否可见
  visible:boolean
  //updateModalOpen:boolean
  // values:Partial<API.RuleListItem>;
}
const CreateModal: React.FC<Props> = (props) => {
  const {visible, onCancel, onSumbit,columns } = props;
  return (
    <Modal visible={visible} footer={null} onCancel={()=>onCancel?.()}>
      {
        <ProTable
          type="form"
          columns={columns}
          onSubmit={async(value)=>{
            onSumbit?.(value);
          }}
        />
      }
    </Modal>
  );
};
export default CreateModal;
