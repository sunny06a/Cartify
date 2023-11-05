const catchAsyncErrors = require('../middleware/catchAsyncError');

const stripe = require('stripe')('sk_test_51NvKhZSARL6YhAbkT8bjknQTAhBXh3KL346u5QVxfGPKPKPGPAiJ8uhkoAB3nFS0ks42krSaDiK7tOJ7aOAPENfv00EtCrzKqX');

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'inr',
            metadata: { 
                company: 'Cartify',
             }
        });
    
        res.status(200).json({
            success: true,
            client_secret: myPayment.client_secret
        })
    
    })
 
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
        
            res.status(200).json({
                stripeApiKey: process.env.STRIPE_API_KEY
            })
        
        }
    )