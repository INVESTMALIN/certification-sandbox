import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'

function PromotionsActives() {
    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Voir mes promotions actives</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600">
                        Cette page sera développée prochainement.
                    </p>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default PromotionsActives