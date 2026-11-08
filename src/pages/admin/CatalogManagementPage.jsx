import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tabs,
  Tag,
  message
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { catalogManagementApi } from '../../api/catalogManagementApi';

const RESOURCE_CONFIG = {
  categories: { title: 'Danh mục', singular: 'danh mục' },
  brands: { title: 'Thương hiệu', singular: 'thương hiệu' },
  locations: { title: 'Cửa hàng / kho', singular: 'địa điểm' }
};

const EMPTY_DATA = { categories: [], brands: [], locations: [] };

export default function CatalogManagementPage() {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('categories');
  const [data, setData] = useState(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [modal, setModal] = useState({ open: false, record: null });

  const loadData = useCallback(async (showSpinner = true) => {
    if (showSpinner) setLoading(true);
    try {
      const [categories, brands, locations] = await Promise.all([
        catalogManagementApi.getCategories(),
        catalogManagementApi.getBrands(),
        catalogManagementApi.getLocations()
      ]);
      if (![categories?.data, brands?.data, locations?.data].every(Array.isArray)) {
        throw new Error('Dữ liệu danh mục, thương hiệu hoặc địa điểm không hợp lệ.');
      }
      setData({ categories: categories.data, brands: brands.data, locations: locations.data });
      setLoadError('');
    } catch (error) {
      setLoadError(error.message || 'Không thể tải dữ liệu quản trị danh mục.');
    } finally {
      if (showSpinner) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openCreate = () => {
    form.resetFields();
    setModal({ open: true, record: null });
  };

  const openEdit = (record) => {
    form.setFieldsValue(record);
    setModal({ open: true, record });
  };

  const closeModal = () => {
    if (saving) return;
    setModal({ open: false, record: null });
    form.resetFields();
  };

  const saveRecord = async (values) => {
    setSaving(true);
    const { record } = modal;
    try {
      if (activeTab === 'categories') {
        if (record) await catalogManagementApi.updateCategory(record.id, values);
        else await catalogManagementApi.createCategory(values);
      } else if (activeTab === 'brands') {
        if (record) await catalogManagementApi.updateBrand(record.id, values);
        else await catalogManagementApi.createBrand(values);
      } else if (record) {
        await catalogManagementApi.updateLocation(record.id, {
          name: values.name,
          area: values.area,
          locationType: values.locationType
        });
      } else {
        await catalogManagementApi.createLocation(values);
      }
      message.success(`Đã ${record ? 'cập nhật' : 'tạo'} ${RESOURCE_CONFIG[activeTab].singular}.`);
      setModal({ open: false, record: null });
      form.resetFields();
      await loadData(false);
    } catch (error) {
      message.error(error.message || `Không thể lưu ${RESOURCE_CONFIG[activeTab].singular}.`);
    } finally {
      setSaving(false);
    }
  };

  const deleteRecord = async (record) => {
    try {
      if (activeTab === 'categories') await catalogManagementApi.deleteCategory(record.id);
      else if (activeTab === 'brands') await catalogManagementApi.deleteBrand(record.id);
      else await catalogManagementApi.deleteLocation(record.id);
      message.success(`Đã xóa ${RESOURCE_CONFIG[activeTab].singular}.`);
      await loadData(false);
    } catch (error) {
      message.error(error.message || `Không thể xóa ${RESOURCE_CONFIG[activeTab].singular}.`);
    }
  };

  const toggleLocation = async (record, active) => {
    try {
      await catalogManagementApi.setLocationActive(record.id, active);
      message.success(`Đã ${active ? 'kích hoạt' : 'vô hiệu hóa'} ${record.name}.`);
      await loadData(false);
    } catch (error) {
      message.error(error.message || 'Không thể cập nhật trạng thái địa điểm.');
    }
  };

  const columns = useMemo(() => {
    const actions = {
      title: 'Thao tác',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button aria-label={`Sửa ${record.name}`} icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm
            title={`Xóa ${RESOURCE_CONFIG[activeTab].singular}?`}
            description="Dữ liệu đang được tham chiếu sẽ không thể xóa."
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => deleteRecord(record)}
          >
            <Button danger aria-label={`Xóa ${record.name}`} icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    };

    if (activeTab === 'categories') {
      return [
        { title: 'Tên danh mục', dataIndex: 'name', key: 'name' },
        { title: 'Slug', dataIndex: 'slug', key: 'slug' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description', render: (value) => value || '—' },
        actions
      ];
    }
    if (activeTab === 'brands') {
      return [
        { title: 'Tên thương hiệu', dataIndex: 'name', key: 'name' },
        { title: 'Quốc gia', dataIndex: 'country', key: 'country', render: (value) => value || '—' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description', render: (value) => value || '—' },
        actions
      ];
    }
    return [
      { title: 'Mã địa điểm', dataIndex: 'code', key: 'code' },
      { title: 'Tên địa điểm', dataIndex: 'name', key: 'name' },
      { title: 'Khu vực', dataIndex: 'area', key: 'area', render: (value) => value || '—' },
      {
        title: 'Loại',
        dataIndex: 'locationType',
        key: 'locationType',
        render: (value) => value === 'BRANCH' ? 'Chi nhánh' : value === 'WAREHOUSE' ? 'Kho' : 'Chưa phân loại'
      },
      {
        title: 'Trạng thái',
        dataIndex: 'active',
        key: 'active',
        render: (active, record) => (
          <Space>
            <Switch checked={active} onChange={(checked) => toggleLocation(record, checked)} />
            <Tag color={active ? 'green' : 'default'}>{active ? 'Đang hoạt động' : 'Đã ẩn'}</Tag>
          </Space>
        )
      },
      actions
    ];
  }, [activeTab, data]);

  const tabs = Object.entries(RESOURCE_CONFIG).map(([key, config]) => ({
    key,
    label: config.title
  }));
  const currentConfig = RESOURCE_CONFIG[activeTab];
  const records = data[activeTab] || [];

  return (
    <main className="min-h-screen w-full bg-[#f9f9ff]">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 p-4 sm:p-6">
        <header className="flex flex-col justify-between gap-4 rounded-xl border border-[#d8e3fb]/50 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#086288]">Quản trị hệ thống</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">Danh mục, thương hiệu và cửa hàng / kho</h1>
            <p className="mt-1 text-sm text-slate-600">Mã địa điểm được giữ nguyên sau khi tạo để bảo toàn tương thích.</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
            Thêm {currentConfig.singular}
          </Button>
        </header>

        <section className="rounded-xl border border-[#d8e3fb]/50 bg-white p-4 shadow-sm sm:p-5">
          {loadError && (
            <Alert
              className="mb-4"
              type="error"
              showIcon
              message="Không thể tải dữ liệu"
              description={loadError}
              action={<Button icon={<ReloadOutlined />} onClick={() => loadData()}>Thử lại</Button>}
            />
          )}
          <Tabs activeKey={activeTab} items={tabs} onChange={setActiveTab} />
          {loading && !records.length ? (
            <div className="flex justify-center py-12"><Spin /></div>
          ) : (
            <Table
              rowKey="id"
              columns={columns}
              dataSource={records}
              loading={loading}
              pagination={{ pageSize: 10, showSizeChanger: false }}
              locale={{ emptyText: loadError ? 'Không có dữ liệu để hiển thị.' : 'Chưa có dữ liệu.' }}
            />
          )}
        </section>
      </div>

      <Modal
        title={`${modal.record ? 'Sửa' : 'Thêm'} ${currentConfig.singular}`}
        open={modal.open}
        onCancel={closeModal}
        onOk={() => form.submit()}
        confirmLoading={saving}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={saveRecord}>
          {activeTab === 'categories' && (
            <>
              <Form.Item name="name" label="Tên danh mục" rules={[{ required: true, whitespace: true, message: 'Nhập tên danh mục.' }, { max: 100 }]}>
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item name="slug" label="Slug" rules={[{ required: true, whitespace: true, message: 'Nhập slug.' }, { max: 100 }]}>
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item name="description" label="Mô tả" rules={[{ max: 255 }]}>
                <Input.TextArea rows={3} maxLength={255} />
              </Form.Item>
            </>
          )}
          {activeTab === 'brands' && (
            <>
              <Form.Item name="name" label="Tên thương hiệu" rules={[{ required: true, whitespace: true, message: 'Nhập tên thương hiệu.' }, { max: 100 }]}>
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item name="country" label="Quốc gia" rules={[{ max: 50 }]}>
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item name="description" label="Mô tả" rules={[{ max: 255 }]}>
                <Input.TextArea rows={3} maxLength={255} />
              </Form.Item>
            </>
          )}
          {activeTab === 'locations' && (
            <>
              <Form.Item name="code" label="Mã địa điểm" rules={[{ required: !modal.record, whitespace: true, message: 'Nhập mã địa điểm.' }, { max: 32 }]}>
                <Input maxLength={32} disabled={Boolean(modal.record)} />
              </Form.Item>
              <Form.Item name="name" label="Tên địa điểm" rules={[{ required: true, whitespace: true, message: 'Nhập tên địa điểm.' }, { max: 160 }]}>
                <Input maxLength={160} />
              </Form.Item>
              <Form.Item name="area" label="Khu vực" rules={[{ max: 100 }]}>
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item name="locationType" label="Loại địa điểm" rules={[{ required: true, message: 'Chọn loại địa điểm.' }]}>
                <Select
                  options={[
                    { value: 'BRANCH', label: 'Chi nhánh' },
                    { value: 'WAREHOUSE', label: 'Kho' }
                  ]}
                />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </main>
  );
}
