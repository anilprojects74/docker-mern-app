import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { title: 'Users', value: '1,024', icon: '👥' },
  { title: 'Sales', value: '$12,345', icon: '💰' },
  { title: 'Orders', value: '456', icon: '📦' },
  { title: 'Visitors', value: '7,891', icon: '🌍' },
];

const recentOrders = [
  { id: '#12345', product: 'Product A', amount: '$120', status: 'Shipped' },
  { id: '#12346', product: 'Product B', amount: '$150', status: 'Pending' },
  { id: '#12347', product: 'Product C', amount: '$200', status: 'Delivered' },
  { id: '#12345', product: 'Product A', amount: '$120', status: 'Shipped' },
  { id: '#12346', product: 'Product B', amount: '$150', status: 'Pending' },
  { id: '#12347', product: 'Product C', amount: '$200', status: 'Delivered' },
  { id: '#12345', product: 'Product A', amount: '$120', status: 'Shipped' },
  { id: '#12346', product: 'Product B', amount: '$150', status: 'Pending' },
  { id: '#12347', product: 'Product C', amount: '$200', status: 'Delivered' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  return (
    <div style={styles.page}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.welcome}
      >
        Welcome back, Admin!
      </motion.h1>

      <motion.div
        style={styles.statsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map(({ title, value, icon }, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: '0 6px 15px rgba(0,0,0,0.15)' }}
            style={styles.statCard}
          >
            <div style={styles.icon}>{icon}</div>
            <div>
              <h4 style={{ margin: 0 }}>{title}</h4>
              <p style={styles.statValue}>{value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={styles.tableContainer}
      >
        <h2 style={{ marginBottom: 12 }}>Recent Orders</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(({ id, product, amount, status }) => (
              <tr key={id}>
                <td style={styles.td}>{id}</td>
                <td style={styles.td}>{product}</td>
                <td style={styles.td}>{amount}</td>
                <td style={{ ...styles.td, fontWeight: '600', color: statusColor(status) }}>
                  {status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

const statusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'shipped':
      return 'green';
    case 'pending':
      return 'orange';
    case 'delivered':
      return 'blue';
    default:
      return 'black';
  }
};

const styles = {
  page: {
    padding: 24,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9fafd',
    minHeight: '100vh',
  },
  welcome: {
    marginBottom: 24,
    fontWeight: '700',
    fontSize: 28,
    color: '#1f4037',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 20,
    marginBottom: 40,
  },
  statCard: {
    background: 'white',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    cursor: 'default',
  },
  icon: {
    fontSize: 36,
    marginRight: 15,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '600',
    margin: 0,
    color: '#333',
  },
  tableContainer: {
    background: 'white',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    borderBottom: '2px solid #eee',
    padding: '10px 12px',
    color: '#555',
    fontWeight: '600',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    color: '#666',
  },
};

export default Dashboard;
