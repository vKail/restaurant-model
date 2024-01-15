import { Document, Page, Text, StyleSheet, Image, View } from '@react-pdf/renderer';
import logo from '/public/images/logo-restaurant.jpg';

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    text: {
        margin: 10,
        fontSize: 14,
        textAlign: 'justify',
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    invoiceTable: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px 0',
        borderBottomWidth: 1,
        borderBottomColor: '#ECECEC',
        borderBottomStyle: 'solid',
    },
    invoiceRow: {
        margin: '10px 0'
    },
    invoiceDetail: {
        width: '40%',
    },
    boldText: {
        fontWeight: 'bold',
    },
    invoiceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ECECEC',
        borderBottomStyle: 'solid',
        alignItems: 'center',
        paddingVertical: 8,
    },
    invoiceRowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#000000', // Color más oscuro para el encabezado
        backgroundColor: '#F0F0F0', // Fondo gris claro para el encabezado
        alignItems: 'center',
        paddingVertical: 8,
    },
    invoiceDetail: {
        width: '50%',
        textAlign: 'left',
        paddingLeft: 10, // Alineación del texto a la izquierda con padding
    },
    summarySection: {
        marginTop: 20, // Añade más espacio entre la tabla de productos y el resumen
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5, // Espaciado vertical para cada fila del resumen
    },
    summaryDetail: {
        width: '50%',
        textAlign: 'right', // Alinea el texto a la derecha para enfatizar los totales
    },
});

const InvoicePDF = ({ invoice }) => {
    
    return (
        <Document>
            <Page style={styles.body}>
                <Image style={styles.image} src={logo} />
                <Text style={styles.title}>Factura Nro: {invoice.invoice.invoice_number}</Text>
                <Text style={styles.header}>Detalles de la Factura</Text>
                <View style={styles.invoiceTable}>
                    <Text style={styles.invoiceDetail}>Cliente</Text>
                    <Text style={[styles.invoiceDetail, styles.boldText]}>{invoice.invoice.client_id}</Text>
                </View>
                <View style={styles.invoiceRow}>
                    <Text>Fecha: {invoice.invoice.created_at}</Text>
                </View>
                <View style={styles.invoiceRowHeader}>
                    <Text style={styles.invoiceDetail}>Nombre del Producto</Text>
                    <Text style={styles.invoiceDetail}>Cantidad</Text>
                    <Text style={styles.invoiceDetail}>Valor unitario</Text>
                    <Text style={styles.invoiceDetail}>Valor total</Text>
                </View>
                {Array.isArray(invoice.order.items) && invoice.order.items.map((item) => (
                    <View style={styles.invoiceRow} key={item.product.name}>
                        <Text style={styles.invoiceDetail}>{item.product.name}</Text>
                        <Text style={[styles.invoiceDetail, styles.boldText]}>{item.quantity}</Text>
                        <Text style={[styles.invoiceDetail, styles.boldText]}>{item.product.price}</Text>
                        <Text style={[styles.invoiceDetail, styles.boldText]}>{item.product.price * item.quantity}</Text>
                    </View>
                ))}
                  <View style={styles.summarySection}>
                    <View style={styles.summaryRow}>
                        <Text>Método de Pago:</Text>
                        <Text style={styles.summaryDetail}>{invoice.invoice.payment_method}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text>Subtotal:</Text>
                        <Text style={styles.summaryDetail}>{invoice.order.subtotal}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text>Total:</Text>
                        <Text style={styles.summaryDetail}>{invoice.invoice.total}</Text>
                    </View>
                </View>

                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
};

export default InvoicePDF;