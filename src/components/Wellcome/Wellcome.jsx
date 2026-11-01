import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';
import wellcomeImage from "../../assets/welcomeImage.png";
import css from './Wellcome.module.css';

const Wellcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDemoLogin = async () => {
    // Log in with pre-populated demo user to immediately showcase full dashboard & charts
    await dispatch(authOperations.logIn({ email: 'demo@example.com', password: 'Password123' }));
    navigate('/main');
  };

  const handleDemoRegister = () => {
    // Guide user through the registration flow from scratch
    navigate('/signup');
  };

  return (
    <div className={css.wellcome}>
      <img src={wellcomeImage} alt="wellcomeImage" className={css.image} />
      <div className={css.info}>
        <h1 className={css.title}>Set goals and achieve them</h1>
        <p className={css.subTitle}>The service will help you set goals and follow them.</p>

        {/* Disabled main buttons with hover guidance */}
        <div className={css.buttons}>
          <div className={css.disabledBtnWrapper}>
            <button
              type="button"
              disabled
              className={`${css.btnActive} ${css.btnDisabled}`}
              aria-disabled="true"
            >
              Sign in
            </button>
            <div className={css.disabledTooltip} role="tooltip">
              Please check the information below
            </div>
          </div>

          <div className={css.disabledBtnWrapper}>
            <button
              type="button"
              disabled
              className={`${css.btn} ${css.btnDisabled}`}
              aria-disabled="true"
            >
              Sign up
            </button>
            <div className={css.disabledTooltip} role="tooltip">
              Please check the information below
            </div>
          </div>
        </div>

        {/* Offline Demo Environment Announcement & Interactive Demo Buttons */}
        <div className={css.demoSection}>
          <h2 className={css.demoTitle}>Offline Demo Environment</h2>
          <p className={css.demoNoticeText}>
            <strong>IMPORTANT:</strong> As this legacy project&apos;s backend database is currently archived and offline, fully functional interactive demo modes are provided for both authentication pathways. <strong>Demo Login</strong> includes pre-populated activity metrics to showcase all platform features and analytics charts immediately — recommended if you are visiting for the first time. Choose <strong>Demo Registration</strong> to experience the multi-step user onboarding flow with a clean profile to input your own custom metrics.
          </p>

          <div className={css.demoButtons}>
            <div className={css.demoBtnWrapper}>
              <button
                type="button"
                className={css.demoLoginBtn}
                onClick={handleDemoLogin}
              >
                Demo Login
              </button>
              <div className={css.demoTooltip} role="tooltip">
                <p className={css.tooltipTitle}>⚡ Pre-Loaded Analytics</p>
                <p className={css.tooltipDesc}>
                  Instant access with pre-filled mock meals, water intake, weight tracker, and complete monthly &amp; yearly dashboard curves to explore all platform features immediately.
                </p>
              </div>
            </div>

            <div className={css.demoBtnWrapper}>
              <button
                type="button"
                className={css.demoRegisterBtn}
                onClick={handleDemoRegister}
              >
                Demo Registration
              </button>
              <div className={css.demoTooltip} role="tooltip">
                <p className={css.tooltipTitle}>🌱 Fresh Custom Start</p>
                <p className={css.tooltipDesc}>
                  Walk through the multi-step registration wizard (goal, body metrics, activity) with a clean profile and empty charts, recording only the data you enter manually.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={css.benefits}>
          <ul className={css.benefitsList}>
            <li className={css.benefitsItem}>
              <p className={css.benefitsName}>Set goals</p>
            </li>
            <li className={css.benefitsItem}>
              <p className={css.benefitsName}>Watch your calories</p>
            </li>
            <li className={css.benefitsItem}>
              <p className={css.benefitsName}>Keep track of your water intake</p>
            </li>
            <li className={css.benefitsItem}>
              <p className={css.benefitsName}>Control your weight</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wellcome;
