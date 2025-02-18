import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { app } from "@/atoms/kuepa";
import { useTranslation } from "react-i18next";
import leadService from '@/services/leadService';

export default function LeadForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    app.set({
      ...(app.get() || {}),
      app: 'kuepa',
      module: 'leads',
      window: 'crm',
      back: null,
      accent: 'purple',
      breadcrumb: [
        { title: 'Leads', url: '/leads' }
      ]
    });
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    try {
      const formattedData = {
        incremental: Math.floor(1000 + Math.random() * 9000), // Número único de 4 dígitos
        full_name: `${data.first_name} ${data.last_name}`,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        mobile_phone: data.mobile_phone,
        interestProgram: data.interestProgram, // Se mantiene como string para ObjectId
        status: 'active',
        trackings: []
      };
      
      const response = await leadService.createLead(formattedData);

      if (!response || response.error) throw new Error(response?.message || 'Error al enviar el formulario');
      
      setMessage('Prospecto registrado exitosamente');
      reset();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-purple-800">{t('Registrar Prospecto')}</h2>
      {message && <p className="text-center text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-purple-800">{t('Nombre')}</label>
          <input {...register('first_name', { required: t('El nombre es obligatorio') })} className="w-full p-2 border rounded" />
          {errors.first_name && <p className="text-red-500 text-sm">{String(errors.first_name.message)}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-800">{t('Apellido')}</label>
          <input {...register('last_name', { required: t('El apellido es obligatorio') })} className="w-full p-2 border rounded" />
          {errors.last_name && <p className="text-red-500 text-sm">{String(errors.last_name.message)}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-800">{t('Correo Electrónico')}</label>
          <input {...register('email', { required: t('El correo es obligatorio'), pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: t('Correo inválido') } })} className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-800">{t('Teléfono')}</label>
          <input {...register('mobile_phone', { required: t('El teléfono es obligatorio') })} className="w-full p-2 border rounded" />
          {errors.mobile_phone && <p className="text-red-500 text-sm">{String(errors.mobile_phone.message)}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-800">{t('Programa de Interés')}</label>
          <input {...register('interestProgram', { required: t('El programa es obligatorio') })} className="w-full p-2 border rounded" />
          {errors.interestProgram && <p className="text-red-500 text-sm">{String(errors.interestProgram.message)}</p>}
        </div>
        <button type="submit" className="w-full bg-purple-800 text-white py-2 rounded hover:bg-purple-900" disabled={loading}>
          {loading ? t('Enviando...') : t('Registrar')}
        </button>
      </form>
    </div>
  );
}
