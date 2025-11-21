import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const SendParel = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    // Set ignores duplicates
    const regions = [...new Set(regionsDuplicate)];
    // explore useMemo useCallBack
    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });

    const districtsByRegion = region => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const handleSendParcel = (data) => {
        console.log(data);
        const isDocument = data.parcelType === "document";
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 60;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }

        console.log(cost);
        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charged ${cost}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I Agree"
        }).then((result) => {
            if (result.isConfirmed) {

                // 

                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });

    }

    return (
        <div>
            <h2 className='text-5xl font-bold'>Send A Parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-4 text-black'>
                {/* Document type */}
                <div>
                    <label className="label mr-4">
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className="label">
                        <input type="radio" {...register('parcelType')} value="non-document" className="radio" />
                        Non-Document
                    </label>
                </div>

                {/* Parcel Info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>
                {/* Two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* Sender Info */}
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">Sender Details</h4>
                        {/* Sender Name */}
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName')} className="input w-full" placeholder="Sender Name" />

                        {/* Sender Email */}
                        <label className="label">Sender Email</label>
                        <input type="email" {...register('senderEmail')} className="input w-full" placeholder="Sender Email" />

                        {/* Sender Region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Region</legend>
                            <select {...register('senderRegion')} defaultValue="Pick a Region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* Sender Districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select {...register('senderDistrict')} defaultValue="Pick a District" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtsByRegion(senderRegion).map((r, index) => <option key={index} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>


                        {/* Sender Address */}
                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />


                    </fieldset>
                    {/* Receiver Info */}
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold">Receiver Details</h4>
                        {/* Receiver Name */}
                        <label className="label">Receiver Name</label>
                        <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />

                        {/* Reciever Email */}
                        <label className="label">Receiver Email</label>
                        <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />

                        {/* Receiver Region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver Region</legend>
                            <select {...register('receiverRegion')} defaultValue="Pick a Region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* Receiver Districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver Districts</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtsByRegion(receiverRegion).map((d, index) => <option key={index} value={d}>{d}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* Receiver Address */}
                        <label className="label mt-4">Receiver Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />

                    </fieldset>
                </div>
                <input type="submit" value="Send Parcel" className='btn btn-primary text-black mt-8' />
            </form>
        </div>
    );
};

export default SendParel;