import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import AirbnbFooter from '../../components/airbnb/AirbnbFooter'

function AirbnbAircover() {
    const [helpful, setHelpful] = useState(null)

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <AirbnbHeader />

            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 flex-wrap">
                    <Link to="/airbnb/centre-aide" className="hover:underline">Accueil</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="hover:underline cursor-default">All topics</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="hover:underline cursor-default">À propos de l'activité d'hôte</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="hover:underline cursor-default">Protection et assurances</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-800">La protection AirCover pour les hôtes</span>
                </nav>

                <div className="flex gap-12">
                    {/* Contenu principal */}
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-2">Guide · Hôte d'un logement</p>
                        <h1 className="text-3xl font-semibold text-gray-900 mb-8">La protection AirCover pour les hôtes</h1>

                        {/* Logo AirCover */}
                        <img src="/aircover.avif" alt="AirCover for Hosts" className="h-14 mb-6" />

                        {/* Intro */}
                        <p className="text-gray-700 leading-relaxed mb-8">
                            Des accidents peuvent parfois se produire, c'est pourquoi nous avons créé AirCover pour les hôtes. Celle-ci comprend la vérification de l'identité des voyageurs, la vérification des réservations, la Garantie dommages des hôtes à hauteur de 3 millions de $ US, l'Assurance responsabilité civile des hôtes à hauteur de 1 million de $ US, ainsi qu'une assistance sécurité 24h/24. Elle comprend également l'Assurance responsabilité civile expériences et services, à hauteur de 1 million de dollars US.
                        </p>

                        {/* Section Demande de remboursement */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Demande de remboursement</h2>

                            <p className="text-gray-700 leading-relaxed mb-4">
                                La <strong>protection contre les dommages</strong> vous couvre si un voyageur cause des dommages à votre logement ou à vos biens au cours d'un séjour réservé sur Airbnb. Vous pouvez obtenir un remboursement pour certains dommages causés à votre logement ou à vos biens si le voyageur qui en est responsable ne vous verse pas d'indemnisation. La protection contre les dommages couvre en outre les coûts liés aux services de nettoyage spécialisés applicables à certains cas, pour retirer des taches laissées par les voyageurs (ou leurs invités), remédier à des dégâts causés par les animaux de compagnie ou éliminer les odeurs de fumée.
                            </p>

                            <button className="mb-6 px-5 py-2.5 border border-gray-800 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                                Démarrer une demande de remboursement
                            </button>

                            <p className="text-gray-700 leading-relaxed mb-4">
                                L'<strong>Assurance responsabilité civile des hôtes</strong> ainsi que l'<strong>Assurance responsabilité civile expériences et services</strong> vous protègent dans l'éventualité rare où votre responsabilité légale serait engagée concernant des préjudices corporels, des dommages matériels ou un vol de biens subis par un voyageur dans le cadre d'un séjour, d'une expérience ou d'un service Airbnb.
                            </p>

                            <button className="px-5 py-2.5 border border-gray-800 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                                Demander une indemnisation en responsabilité civile
                            </button>
                        </section>

                        {/* Section Programmes */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Programmes AirCover pour les hôtes</h2>

                            <div className="space-y-4">
                                {[
                                    {
                                        title: 'Garantie dommages des hôtes',
                                        desc: 'Découvrez ce qui est éligible et comment demander un remboursement.',
                                    },
                                    {
                                        title: 'Assurance responsabilité civile des hôtes',
                                        desc: 'Découvrez ce qui est couvert par l\'assurance et comment faire une demande d\'indemnisation si un voyageur se blesse au cours d\'un séjour.',
                                    },
                                    {
                                        title: 'Assurance responsabilité civile expériences et services',
                                        desc: 'Découvrez ce qui est couvert par l\'assurance et comment faire une demande d\'indemnisation si un voyageur se blesse au cours d\'une expérience ou d\'un service.',
                                    },
                                ].map((item) => (
                                    <div key={item.title} className="border-b border-gray-200 pb-4">
                                        <button className="text-left w-full group">
                                            <p className="text-sm font-semibold text-gray-900 underline group-hover:text-[#FF385C] transition-colors mb-1">{item.title}</p>
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section assurance personnelle */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">AirCover pour les hôtes et votre assurance personnelle</h2>

                            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                                <p>AirCover pour les hôtes vous protège si vous proposez un logement, une expérience ou un service sur Airbnb, mais ne peut se substituer à une assurance personnelle. La loi peut aussi exiger que vous souscriviez une assurance automobile, laquelle ne fait pas partie d'AirCover pour les hôtes. Parce que chaque situation peut être différente, consultez votre assureur pour déterminer si votre police d'assurance offre les mêmes protections qu'AirCover pour les hôtes.</p>

                                <p>La Garantie dommages des hôtes, l'Assurance responsabilité civile des hôtes et l'Assurance responsabilité civile expérience et services ne couvrent pas les hôtes qui proposent des séjours par le biais d'Airbnb Travel, LLC, ni ceux qui proposent des séjours ou des expériences au Japon, où l'Assurance Hôte Japon et l'Assurance Expérience Japon s'appliquent. La Garantie dommage des hôtes n'est pas liée à l'Assurance responsabilité civile des hôtes. Pour les hôtes dont le pays de résidence ou d'établissement n'est pas l'Australie, ces Conditions de la Garantie dommages des hôtes s'appliquent. Pour les hôtes dont le pays de résidence ou d'établissement est l'Australie, la Garantie dommages des hôtes est soumise aux Conditions de la Garantie dommages des hôtes pour les utilisateurs australiens. Pour les logements situés dans l'État de Washington, les obligations contractuelles d'Airbnb au titre de la Garantie dommages des hôtes sont couvertes par une police d'assurance souscrite par Airbnb. N'oubliez pas : tous les seuils de couverture sont affichés en dollars US.</p>

                                <p>L'Assurance responsabilité civile des hôtes et l'Assurance responsabilité civile expériences et services sont souscrites par des assureurs tiers. Si vous êtes hôte au Royaume-Uni, les polices de l'Assurance responsabilité civile des hôtes et de l'Assurance responsabilité civile expériences et services sont souscrites par Zurich Insurance Company Ltd., et sont pensées et conclues sans frais supplémentaires pour les hôtes au Royaume-Uni par Airbnb UK Services Limited, un représentant mandaté par Aon UK Limited, agréé et contrôlé par la Financial Conduct Authority (FCA). Le numéro d'enregistrement à la FCA d'Aon est le 310451. Vous pouvez vérifier cette information dans le Registre des services financiers en consultant le site web de la FCA, ou par téléphone au 0800 111 6768. Les polices de l'Assurance responsabilité civile des hôtes et de l'Assurance responsabilité civile expériences et services proposées dans le cadre d'AirCover pour les hôtes sont réglementées par la Financial Conduct Authority. Les autres produits et services ne sont pas des produits réglementés proposés par Airbnb UK Services Limited. FP.AFF.418.LC</p>

                                <p>Si vous proposez des séjours dans l'Espace économique européen (EEE), les polices relatives à l'Assurance responsabilité civile des hôtes ainsi qu'à l'Assurance responsabilité civile expériences et services sont souscrites par la succursale espagnole de Zurich Insurance Europe AG. Elles sont proposées et conclues en Espagne sans frais supplémentaires pour les hôtes dans l'EEE par Airbnb Spain Insurance Agency S.L.U. (ASIASL), une agence d'assurance non liée supervisée par la Direction générale des assurances, des pensions et des fonds de pension (DGSFP) et enregistrée en Espagne sous le numéro AJ0364 au Registre des distributeurs d'assurance de la DGSFP. Vous pouvez vérifier cette information en consultant le Registre des distributeurs d'assurance de la DGSFP et accéder à tous les détails de l'ASIASL ici.</p>

                            </div>
                        </section>

                        {/* Utile ? */}
                        <div className="border-t border-gray-200 pt-8 mb-10">
                            <p className="text-sm font-medium text-gray-900 mb-3">Cet article vous a-t-il été utile ?</p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setHelpful(true)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${helpful === true ? 'border-[#FF385C] text-[#FF385C] bg-red-50' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                                >
                                    <ThumbsUp className="w-4 h-4" />
                                    Oui
                                </button>
                                <button
                                    onClick={() => setHelpful(false)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${helpful === false ? 'border-[#FF385C] text-[#FF385C] bg-red-50' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                                >
                                    <ThumbsDown className="w-4 h-4" />
                                    Non
                                </button>
                            </div>
                        </div>

                        {/* Sur le même sujet */}
                        <section>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sur le même sujet</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        tag: 'Guide pratique · Hôte d\'un logement',
                                        title: 'Garantie dommages des hôtes',
                                        desc: 'La Garantie dommages des hôtes, comprise dans AirCover pour les hôtes, couvre les hôtes à hauteur de 3 millions de $ US dans les rares cas où votre logement ou vos biens seraient...',
                                    },
                                    {
                                        tag: 'Guide pratique · Hôte d\'un logement',
                                        title: 'AirCover pour les hôtes',
                                        desc: 'AirCover pour les hôtes est un programme qui comprend la vérification de l\'identité des voyageurs, la vérification des réservations, une Garantie de voyage des hôtes à hauteur de...',
                                    },
                                    {
                                        tag: 'Conditions et dispositions juridiques',
                                        title: 'Conditions de la Garantie dommages des hôtes',
                                        desc: 'Veuillez consulter les Conditions de la Garantie dommages des hôtes.',
                                    },
                                ].map((article) => (
                                    <div key={article.title} className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow cursor-pointer">
                                        <p className="text-xs text-gray-500 mb-1">{article.tag}</p>
                                        <p className="text-sm font-semibold text-gray-900 mb-1">{article.title}</p>
                                        <p className="text-xs text-gray-500 leading-relaxed">{article.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-64 flex-shrink-0">
                        <div className="border border-gray-200 rounded-2xl p-5 sticky top-8">
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Besoin de nous joindre ?</h3>
                            <p className="text-sm text-gray-600 mb-4">Commençons par quelques questions afin de mieux vous orienter.</p>
                            <button className="w-full px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors mb-3">
                                Contactez-nous
                            </button>
                            <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                                Envoyer vos remarques
                            </button>
                        </div>
                    </aside>
                </div>
            </main>

            <AirbnbFooter />
        </div>
    )
}

export default AirbnbAircover
