package aplikacija;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.KorisnikDAO;
import model.Korisnik;
import model.TipKorisnika;;



public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
			String username = request.getParameter("username");
			String password = request.getParameter("password");

			List<Korisnik> korisnici = KorisnikDAO.getAll();
			List<String> userNames = new ArrayList<String>();
			
			for(Korisnik korisnik : korisnici) {
				userNames.add(korisnik.getKorime());
			}
			
			if(userNames.contains(username)) {
				request.getRequestDispatcher("./FailServlet").forward(request, response);
				return;
			}

			SimpleDateFormat format = 
			     new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Calendar datumVreme = Calendar.getInstance();
			
			Korisnik korisnik = new Korisnik(username, password, format.format(datumVreme.getTime()).toString(), TipKorisnika.KORISNIK, true);
			KorisnikDAO.add(korisnik);


			Map<String, Object> data = new LinkedHashMap<>();

			request.setAttribute("data", data);
			request.getRequestDispatcher("./SuccessServlet").forward(request, response);
	}

}
