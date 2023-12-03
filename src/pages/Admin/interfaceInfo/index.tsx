import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, message} from 'antd';
import React, {useRef, useState} from 'react';
import UpdateModal from './components/UpdateModal';
import CreateModal from "./components/CreateModel";
import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfoUsingPOST,
  listInterfaceInfoVOByPageUsingPOST,
  offLineInterfaceInfoUsingPOST,
  onLineInterfaceInfoUsingPOST,
  updateInterfaceInfoUsingPOST
} from "@/services/swagger/interfaceInfoController";
import {SortOrder} from "antd/lib/table/interface";


const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfoVO[]>([]);
  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfoAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPOST({
        ...fields,
      });
      hide();
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfoUpdateRequest) => {
    // 如果没有选中，则直接返回
    if (!currentRow) return;
    //设置加载修改中
    const hide = message.loading('修改中');
    try {
      //修改请求接口updateInterfaceInfoUsingPOST
      await updateInterfaceInfoUsingPOST({
        id:currentRow.id,
        ...fields
      });
      hide();
      //如果调用成功显示操作成功
      message.success('操作成功');
      return true;
    } catch (error:any) {
      hide();
      message.error('操作失败,'+ error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.InterfaceInfoVO) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      //修改接口为deleteInterfaceInfoUsingPOST
      await deleteInterfaceInfoUsingPOST({
        id:record.id
      });
      hide();
      //删除成功提示
      message.success('删除成功');
      //刷新页面
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };


  /**
   *  Delete node
   * @zh-CN 发布接口
   *
   * @param selectedRows
   */
  const handleOnLine = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      //修改接口为deleteInterfaceInfoUsingPOST
      await onLineInterfaceInfoUsingPOST({
        id:record.id
      });
      hide();
      //删除成功提示
      message.success('操作成功');
      //刷新页面
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('操作失败');
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 发布接口
   *
   * @param selectedRows
   */
  const handleOffLine = async (record: API.IdRequest) => {
    const hide = message.loading('关闭中');
    if (!record) return true;
    try {
      //修改接口为deleteInterfaceInfoUsingPOST
      await offLineInterfaceInfoUsingPOST({
        id:record.id
      });
      hide();
      //删除成功提示
      message.success('操作成功');
      //刷新页面
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('操作失败');
      return false;
    }
  };


  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index'
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps:{
        rules: [
          {
            required: true,
            message: '请输入接口名称！',
          },
        ],
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType: 'text',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'textarea',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default'
        },
        1: {
          text: '开启',
          status: 'Processing'
        }
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '创建时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm:true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,


        record.status === 0 ?
        <a
          key="onlien"
          onClick={() => {
            handleOnLine(record);
          }}
        >
          发布
        </a> : null,
        record.status === 1 ?
          <Button
            type="text"
            danger
            key="offLine"
            onClick={() => {
            handleOffLine(record);
          }}
        >
          下线
        </Button>: null,
        //删除
        <Button
          type="text"
          danger
          key="remove"
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </Button>,
      ],
    }
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request ={async (params, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>)=>{
          const res =await listInterfaceInfoVOByPageUsingPOST({
            ...params,
          });
          console.log(res);
          if(res?.data){
            return {
              data: res?.data.records || [],
              success: true,
              total: res.data.total
            }
          }else{
            return {
              data: [],
              success: true,
              total: 0
            }
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      <UpdateModal
        values={currentRow || {}}
        columns={columns}
        onSubmit={async (value) => {
          console.log("更新的数据-------------------------")
          console.log(value)
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}

      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>

      <CreateModal
        columns={columns}
        onCancel={()=>{
          handleModalOpen(false);
        }}
        onSubmit = {(values)=>{
          handleAdd(values);
        }}
        visible={createModalOpen}
        />
    </PageContainer>
  );
};
export default TableList;
