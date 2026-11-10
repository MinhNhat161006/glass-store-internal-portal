import React, { useState, useEffect, useCallback } from 'react';
import { Table, Tag, Switch, Button, Modal, Form, Input, InputNumber, Select, Space, Popconfirm, message, Card } from 'antd';
import { voucherApi } from '../../api/voucherApi';

export default function VoucherManagementPage() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const fetchVouchers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await voucherApi.getAllVouchers();
      if (Array.isArray(data)) {
        setVouchers(data);
      }
    } catch (err) {
      message.error(err.message || 'Không thể tải danh sách mã giảm giá');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  const handleToggle = async (id, currentStatus) => {
    try {
      await voucherApi.toggleVoucher(id);
      message.success('Cập nhật trạng thái voucher thành công');
      setVouchers(prev => prev.map(v => v.id === id ? { ...v, active: !currentStatus } : v));
    } catch (err) {
      message.error(err.message || 'Lỗi khi đổi trạng thái voucher');
    }
  };

  const handleDelete = async (id) => {
    try {
      await voucherApi.deleteVoucher(id);
      message.success('Đã xóa voucher thành công');
      setVouchers(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      message.error(err.message || 'Lỗi khi xóa voucher');
    }
  };

  const handleOpenModal = (voucher = null) => {
    setEditingVoucher(voucher);
    if (voucher) {
      form.setFieldsValue({
        code: voucher.code,
        name: voucher.name,
        discountType: voucher.discountType || 'PERCENT',
        discountValue: Number(voucher.discountValue || 0),
        minOrderAmount: voucher.minOrderAmount != null ? Number(voucher.minOrderAmount) : 0,
        maxDiscountAmount: voucher.maxDiscountAmount != null ? Number(voucher.maxDiscountAmount) : null,
        channel: voucher.channel || 'ALL',
        active: voucher.active !== false
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        discountType: 'PERCENT',
        discountValue: 10,
        minOrderAmount: 0,
        channel: 'ALL',
        active: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      const payload = {
        ...values,
        code: values.code.trim().toUpperCase()
      };

      if (editingVoucher) {
        await voucherApi.updateVoucher(editingVoucher.id, payload);
        message.success('Cập nhật voucher thành công');
      } else {
        await voucherApi.createVoucher(payload);
        message.success('Tạo voucher mới thành công');
      }

      setIsModalOpen(false);
      form.resetFields();
      fetchVouchers();
    } catch (err) {
      if (err.errorFields) return;
      message.error(err.message || 'Lỗi lưu thông tin voucher');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredVouchers = vouchers.filter(v => {
    if (channelFilter !== 'ALL' && v.channel && v.channel !== 'ALL' && v.channel !== channelFilter) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const matchCode = (v.code || '').toLowerCase().includes(q);
      const matchName = (v.name || '').toLowerCase().includes(q);
      return matchCode || matchName;
    }
    return true;
  });

  const columns = [
    {
      title: 'Mã Voucher',
      dataIndex: 'code',
      key: 'code',
      render: (code) => <span className="font-mono font-bold text-[#004967]">{code}</span>
    },
    {
      title: 'Tên Chương Trình',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <span className="font-medium text-[#111c2d]">{name}</span>
    },
    {
      title: 'Loại Giảm Giá',
      dataIndex: 'discountType',
      key: 'discountType',
      render: (type) => (
        <Tag color={type === 'PERCENT' ? 'blue' : 'purple'}>
          {type === 'PERCENT' ? 'Phần trăm (%)' : 'Số tiền cố định (₫)'}
        </Tag>
      )
    },
    {
      title: 'Mức Giảm',
      key: 'discountValue',
      render: (_, r) => (
        <span className="font-bold text-[#086288]">
          {r.discountType === 'PERCENT'
            ? `${r.discountValue}%`
            : `${Number(r.discountValue || 0).toLocaleString('vi-VN')} ₫`}
        </span>
      )
    },
    {
      title: 'Đơn Tối Thiểu',
      dataIndex: 'minOrderAmount',
      key: 'minOrderAmount',
      render: (min) => min ? `${Number(min).toLocaleString('vi-VN')} ₫` : 'Không yêu cầu'
    },
    {
      title: 'Giảm Tối Đa',
      dataIndex: 'maxDiscountAmount',
      key: 'maxDiscountAmount',
      render: (max) => max ? `${Number(max).toLocaleString('vi-VN')} ₫` : 'Không giới hạn'
    },
    {
      title: 'Kênh Áp Dụng',
      dataIndex: 'channel',
      key: 'channel',
      render: (ch) => {
        if (ch === 'POS') return <Tag color="green">POS Quầy</Tag>;
        if (ch === 'ONLINE') return <Tag color="cyan">Online Web</Tag>;
        return <Tag color="geekblue">Toàn Chuỗi (ALL)</Tag>;
      }
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'active',
      key: 'active',
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={() => handleToggle(record.id, active)}
          checkedChildren="Bật"
          unCheckedChildren="Tắt"
        />
      )
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => handleOpenModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xóa voucher này?"
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button size="small" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full max-w-[1600px] mx-auto p-3.5 sm:p-5 gap-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-xs">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#70787f]">
              <span>Quản Trị</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Khuyến Mãi &amp; Tiếp Thị</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#004967] font-semibold">Quản Lý Voucher (S3-16)</span>
            </div>
            <h1 className="text-lg font-bold text-[#111c2d] mt-1">Danh Mục Mã Giảm Giá &amp; Khuyến Mãi Web-POS</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="primary"
              onClick={() => handleOpenModal(null)}
              className="bg-[#004967] hover:bg-[#086288] flex items-center gap-1 rounded-xl"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Thêm Voucher Mới</span>
            </Button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#d8e3fb]/40 shadow-xs">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Tìm theo mã hoặc tên voucher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 280 }}
              allowClear
            />
            <Select
              value={channelFilter}
              onChange={setChannelFilter}
              style={{ width: 160 }}
              options={[
                { value: 'ALL', label: 'Tất cả kênh bán' },
                { value: 'POS', label: 'Chỉ tại Quầy POS' },
                { value: 'ONLINE', label: 'Chỉ Online Web' }
              ]}
            />
          </div>

          <div className="text-xs text-[#70787f]">
            Tổng số: <strong className="text-[#004967]">{filteredVouchers.length}</strong> mã giảm giá
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#d8e3fb]/40 shadow-xs overflow-hidden">
          <Table
            columns={columns}
            dataSource={filteredVouchers}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10, showSizeChanger: true }}
          />
        </div>

        {/* Create / Edit Modal */}
        <Modal
          title={editingVoucher ? 'Cập Nhật Voucher Khuyến Mãi' : 'Thêm Mới Voucher Khuyến Mãi'}
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          okText={editingVoucher ? 'Lưu Thay Đổi' : 'Tạo Voucher'}
          cancelText="Hủy"
          confirmLoading={submitting}
          okButtonProps={{ className: 'bg-[#004967]' }}
        >
          <Form form={form} layout="vertical" className="mt-3">
            <Form.Item
              name="code"
              label="Mã Giảm Giá (Voucher Code)"
              rules={[{ required: true, message: 'Vui lòng nhập mã voucher' }]}
            >
              <Input
                placeholder="VD: BOLON200K, FREELAB2026..."
                disabled={!!editingVoucher}
                style={{ textTransform: 'uppercase' }}
              />
            </Form.Item>

            <Form.Item
              name="name"
              label="Tên Chương Trình / Mô Tả"
              rules={[{ required: true, message: 'Vui lòng nhập tên chương trình' }]}
            >
              <Input placeholder="VD: Giảm 200k combo gọng Bolon & tròng Crizal" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-3">
              <Form.Item
                name="discountType"
                label="Loại Giảm Giá"
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { value: 'PERCENT', label: 'Theo Phần Trăm (%)' },
                    { value: 'FIXED', label: 'Số Tiền Cố Định (₫)' }
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="discountValue"
                label="Mức Giảm"
                rules={[{ required: true, message: 'Vui lòng nhập mức giảm' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Form.Item
                name="minOrderAmount"
                label="Đơn Hàng Tối Thiểu (₫)"
              >
                <InputNumber min={0} step={10000} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="maxDiscountAmount"
                label="Mức Giảm Tối Đa (₫, nếu có)"
              >
                <InputNumber min={0} step={10000} placeholder="Không giới hạn" style={{ width: '100%' }} />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Form.Item
                name="channel"
                label="Kênh Áp Dụng"
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { value: 'ALL', label: 'Tất cả (ALL)' },
                    { value: 'POS', label: 'POS Quầy' },
                    { value: 'ONLINE', label: 'Online Web' }
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="active"
                label="Kích Hoạt Ngay"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
