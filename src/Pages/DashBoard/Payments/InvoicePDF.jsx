import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid #000",
    paddingBottom: 5,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  col1: { width: "50%" },
  col2: { width: "15%", textAlign: "center" },
  col3: { width: "15%", textAlign: "right" },
  col4: { width: "20%", textAlign: "right" },
  total: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
});

const InvoicePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>INVOICE</Text>
          <Text>{data.company.name}</Text>
          <Text>{data.company.email}</Text>
          <Text>{data.company.phone}</Text>
        </View>

        <View>
          <Text>Invoice No: {data.invoiceNo}</Text>
          <Text>Date: {data.date}</Text>
          <Text>Status: {data.payment.status}</Text>
        </View>
      </View>

      {/* Customer */}
      <View style={styles.section}>
        <Text>Bill To:</Text>
        <Text>{data.customer.name}</Text>
        <Text>{data.customer.email}</Text>
        <Text>{data.customer.phone}</Text>
      </View>

      {/* Table */}
      <View style={styles.tableHeader}>
        <Text style={styles.col1}>Description</Text>
        <Text style={styles.col2}>Qty</Text>
        <Text style={styles.col3}>Price</Text>
        <Text style={styles.col4}>Total</Text>
      </View>

      {data.items.map((item, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.col1}>{item.title}</Text>
          <Text style={styles.col2}>{item.qty}</Text>
          <Text style={styles.col3}>{item.price}</Text>
          <Text style={styles.col4}>{item.qty * item.price}</Text>
        </View>
      ))}

      {/* Total */}
      <Text style={styles.total}>
        Total Paid: {data.payment.total} BDT
      </Text>

      {/* Footer */}
      <View style={{ marginTop: 20 }}>
        <Text>Payment Method: {data.payment.method}</Text>
        <Text>Transaction ID: {data.payment.transactionId}</Text>
        <Text>Thank you for your payment </Text>
      </View>

    </Page>
  </Document>
);

export default InvoicePDF;
