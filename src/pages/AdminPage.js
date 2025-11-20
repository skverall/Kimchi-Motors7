import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Plus, Trash2, X } from 'lucide-react';
import { supabase } from '../supabase/config';
import { BRANDS } from '../data/mockData';

const AdminLogin = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition"
                    title="Back to Home"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="text-center mb-8 pt-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl mx-auto flex items-center justify-center mb-4">
                        <span className="text-white font-black text-xl">KM</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Admin Access</h2>
                    <p className="text-slate-500">Enter credentials to manage showroom</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none" type="email" placeholder="admin@kimchimotors.com" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none" type="password" placeholder="••••••••" required />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button disabled={loading} className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition disabled:opacity-50">
                        {loading ? 'Logging in...' : 'Login Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const AdminDashboard = ({ cars, onAdd, onDelete }) => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        make: 'Mercedes-Benz', model: '', year: 2024, price: 0, mileage: 0,
        fuel: 'Petrol', transmission: 'Automatic', image: '', type: 'Sedan',
        description: '', featured: false, mostWanted: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        setAddModalOpen(false);
        setFormData({ ...formData, model: '', price: 0 }); // Reset key fields
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"><Settings className="w-4 h-4" /></div>
                    <h1 className="font-bold text-lg">Showroom Manager</h1>
                </div>
                <button onClick={handleLogout} className="text-sm hover:text-red-400 transition">Logout</button>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Vehicle Inventory ({cars.length})</h2>
                    <button onClick={() => setAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg shadow-blue-200">
                        <Plus className="w-4 h-4" /> Add Vehicle
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Vehicle</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Price</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {cars.map(car => (
                                <tr key={car.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 flex items-center gap-3">
                                        <img src={car.image} alt={`${car.make} ${car.model}`} className="w-10 h-10 rounded object-cover" />
                                        <div>
                                            <div className="font-bold text-slate-900">{car.make} {car.model}</div>
                                            <div className="text-xs text-slate-500">{car.year} • {car.mileage}km</div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium">${car.price.toLocaleString()}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {car.featured && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-bold">Featured</span>}
                                            {car.mostWanted && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-bold">Wanted</span>}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => onDelete(car.id)} className="text-slate-400 hover:text-red-500 transition p-2">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ADD MODAL */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900">Add New Vehicle</h3>
                            <button onClick={() => setAddModalOpen(false)}><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="label">Make</label>
                                <select className="input" value={formData.make} onChange={e => setFormData({ ...formData, make: e.target.value })}>
                                    {BRANDS.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="label">Model</label>
                                <input className="input" required type="text" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} />
                            </div>
                            <div>
                                <label className="label">Year</label>
                                <input className="input" type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })} />
                            </div>
                            <div>
                                <label className="label">Price ($)</label>
                                <input className="input" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="label">Image URL</label>
                                <input className="input" type="url" required placeholder="https://..." value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div>
                                <label className="label">Mileage (km)</label>
                                <input className="input" type="number" value={formData.mileage} onChange={e => setFormData({ ...formData, mileage: parseInt(e.target.value) })} />
                            </div>
                            <div>
                                <label className="label">Fuel</label>
                                <select className="input" value={formData.fuel} onChange={e => setFormData({ ...formData, fuel: e.target.value })}>
                                    <option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option>
                                </select>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} />
                                    <span className="text-sm font-medium">Featured</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={formData.mostWanted} onChange={e => setFormData({ ...formData, mostWanted: e.target.checked })} />
                                    <span className="text-sm font-medium">Most Wanted</span>
                                </label>
                            </div>
                            <div className="md:col-span-2 mt-4">
                                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Save Vehicle</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <style>{`
                .label { display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #475569; margin-bottom: 0.25rem; }
                .input { width: 100%; padding: 0.75rem; background: #F8FAFC; border-radius: 0.5rem; border: 1px solid #E2E8F0; outline: none; transition: all; }
                .input:focus { border-color: #3B82F6; background: white; }
            `}</style>
        </div>
    );
};

const AdminPage = ({ onBack, cars, onAdd, onDelete }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>;
    }

    if (!session) {
        return <AdminLogin onBack={onBack} />;
    }

    return <AdminDashboard cars={cars} onAdd={onAdd} onDelete={onDelete} />;
}

export default AdminPage;
